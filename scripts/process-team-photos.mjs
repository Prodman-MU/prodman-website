// Crops AI-background-removed team cutouts (see remove-team-backgrounds.mjs) into
// consistent portrait "sticker" frames: finds the largest connected alpha blob
// (so stray background fragments the segmenter missed don't skew the crop),
// then frames a portrait window sized off shoulder width, anchored just above
// the head, so full-body and bust-only source photos land at the same visual
// scale.
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const TARGET_ASPECT = 4 / 5; // width / height
const OUTPUT_WIDTH = 900;
const OUTPUT_HEIGHT = Math.round(OUTPUT_WIDTH / TARGET_ASPECT);
// High on purpose: only used to pick the subject's connected blob, not to
// clip the final soft alpha edge. Debris the segmenter half-kept (a plant,
// a table) is usually joined to the subject only by a faint antialiased
// bridge — a strict threshold breaks that bridge so it isn't picked up as
// part of "the person".
const BLOB_ALPHA_THRESHOLD = 180;
const SCAN_MAX_DIM = 360;

const DEFAULTS = { paddingFactor: 1.32, marginAboveFrac: 0.055 };

// Per-person art-direction overrides, tuned after visually reviewing the raw
// cutouts (remove-team-backgrounds.mjs output): stray segmentation debris and
// pose-specific framing fixes that a generic bbox rule can't get right.
const OVERRIDES = {
  akshat: { paddingFactor: 1.22 }, // trims a retained couch-fabric fragment near his right hand
  // Her seated pose needs slightly more air than the standing portraits, but
  // keeping the frame tighter than the first pass excludes a detached table
  // fragment at the far-right edge.
  supriya: { paddingFactor: 1.22, marginAboveFrac: 0.07 },
  // A pothos plant behind his head survived person segmentation. A rectangular
  // erase also removed the top of his hair, so key only green-dominant pixels
  // in the mapped source region and preserve every non-green subject pixel.
  "akhil-menon": {
    paddingFactor: 1.12,
    erase: [{ left: 950, top: 650, width: 550, height: 250 }],
    colorErase: [
      { left: 980, top: 740, width: 500, height: 300, mode: "green" },
      { left: 950, top: 850, width: 550, height: 130, mode: "saturated" },
    ],
  },
};

const cacheDir = process.argv[2] || "/tmp/team-cutout-cache";
const outDir = process.argv[3] || "public/team/cutouts";

const SLUGS = [
  "sai-harsha",
  "akhil-menon",
  "anusha",
  "akshat",
  "muskan-sharma",
  "supriya",
  "om-umrania",
];

function findLargestBlob(mask, width, height) {
  const visited = new Uint8Array(width * height);
  let best = null;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (!mask[idx] || visited[idx]) continue;

      // BFS flood fill
      const queue = [idx];
      visited[idx] = 1;
      let minX = x, maxX = x, minY = y, maxY = y, count = 0;
      let qi = 0;
      while (qi < queue.length) {
        const cur = queue[qi++];
        count++;
        const cy = Math.floor(cur / width);
        const cx = cur % width;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;

        const neighbors = [
          cy > 0 ? cur - width : -1,
          cy < height - 1 ? cur + width : -1,
          cx > 0 ? cur - 1 : -1,
          cx < width - 1 ? cur + 1 : -1,
        ];
        for (const n of neighbors) {
          if (n >= 0 && mask[n] && !visited[n]) {
            visited[n] = 1;
            queue.push(n);
          }
        }
      }

      if (!best || count > best.count) {
        best = { count, minX, maxX, minY, maxY };
      }
    }
  }
  return best;
}

async function processOne(slug) {
  const cachePath = path.join(cacheDir, `${slug}.png`);
  let raw = await readFile(cachePath);

  const cfgPre = OVERRIDES[slug] || {};
  if (cfgPre.colorErase?.length) {
    const { data, info } = await sharp(raw)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (const region of cfgPre.colorErase) {
      const right = Math.min(info.width, region.left + region.width);
      const bottom = Math.min(info.height, region.top + region.height);

      for (let y = Math.max(0, region.top); y < bottom; y++) {
        for (let x = Math.max(0, region.left); x < right; x++) {
          const i = (y * info.width + x) * info.channels;
          const red = data[i];
          const green = data[i + 1];
          const blue = data[i + 2];

          const saturation = Math.max(red, green, blue) - Math.min(red, green, blue);
          const eraseGreen = region.mode === "green" && green > 30 && green > red + 8 && green > blue + 10;
          const eraseSaturated = region.mode === "saturated" && Math.max(red, green, blue) > 25 && saturation > 12;

          if (eraseGreen || eraseSaturated) {
            data[i + 3] = 0;
          }
        }
      }
    }

    raw = await sharp(data, { raw: info }).png().toBuffer();
  }

  if (cfgPre.erase?.length) {
    raw = await sharp(raw)
      .ensureAlpha()
      .composite(
        cfgPre.erase.map((r) => ({
          input: {
            create: { width: r.width, height: r.height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } },
          },
          left: r.left,
          top: r.top,
          blend: "dest-out",
        }))
      )
      .png()
      .toBuffer();
  }

  const base = sharp(raw).ensureAlpha();
  const meta = await base.metadata();

  // Pad generously so the crop window can never run off the canvas.
  const pad = Math.round(Math.max(meta.width, meta.height) * 0.5);
  const padded = sharp(raw)
    .ensureAlpha()
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } });
  const paddedBuf = await padded.png().toBuffer();
  const paddedMeta = await sharp(paddedBuf).metadata();

  // Downscaled scan for connected-component blob detection.
  const scale = SCAN_MAX_DIM / Math.max(paddedMeta.width, paddedMeta.height);
  const scanW = Math.max(1, Math.round(paddedMeta.width * scale));
  const scanH = Math.max(1, Math.round(paddedMeta.height * scale));
  const { data } = await sharp(paddedBuf)
    .resize(scanW, scanH, { fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const mask = new Uint8Array(scanW * scanH);
  for (let i = 0; i < scanW * scanH; i++) {
    mask[i] = data[i * 4 + 3] > BLOB_ALPHA_THRESHOLD ? 1 : 0;
  }

  const blob = findLargestBlob(mask, scanW, scanH);
  if (!blob) throw new Error(`${slug}: no alpha content found`);

  const inv = 1 / scale;
  const bbox = {
    left: blob.minX * inv,
    right: (blob.maxX + 1) * inv,
    top: blob.minY * inv,
    bottom: (blob.maxY + 1) * inv,
  };
  const bboxWidth = bbox.right - bbox.left;
  const bboxCenterX = (bbox.left + bbox.right) / 2;

  const cfg = { ...DEFAULTS, ...(OVERRIDES[slug] || {}) };
  const cropWidth = bboxWidth * cfg.paddingFactor;
  const cropHeight = cropWidth / TARGET_ASPECT;
  const cropTop = bbox.top - cfg.marginAboveFrac * cropHeight;
  const cropLeft = bboxCenterX - cropWidth / 2;

  const clampedLeft = Math.min(Math.max(cropLeft, 0), paddedMeta.width - cropWidth);
  const clampedTop = Math.min(Math.max(cropTop, 0), paddedMeta.height - cropHeight);

  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `${slug}.webp`);
  await sharp(paddedBuf)
    .extract({
      left: Math.round(clampedLeft),
      top: Math.round(clampedTop),
      width: Math.round(cropWidth),
      height: Math.round(cropHeight),
    })
    .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT)
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(outPath);

  console.log(`${slug}: bbox ${Math.round(bboxWidth)}w -> ${outPath}`);
}

for (const slug of SLUGS) {
  await processOne(slug);
}
