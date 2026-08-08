// Runs the AI person-segmentation pass once and caches lossless PNG cutouts.
// Follow with process-team-photos.mjs to art-direct, frame, and export the
// website-ready WebP assets. Both scripts share the same default cache path.
import { removeBackground } from "@imgly/background-removal-node";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const SOURCES = [
  "sai-harsha.png",
  "akhil-menon.jpeg",
  "anusha.png",
  "akshat.jpeg",
  "muskan-sharma.jpg",
  "supriya.jpg",
  "om-umrania.png",
];

const srcDir = "public/team";
const cacheDir = process.argv[2] || "/tmp/team-cutout-cache";

await mkdir(cacheDir, { recursive: true });

for (const file of SOURCES) {
  const slug = path.parse(file).name;
  const dest = path.join(cacheDir, `${slug}.png`);
  const start = Date.now();
  const blob = await removeBackground(path.join(srcDir, file));
  const buf = Buffer.from(await blob.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`${slug}: ${((Date.now() - start) / 1000).toFixed(1)}s -> ${dest}`);
}
