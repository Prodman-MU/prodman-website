/**
 * Generate voiceover audio for the ProdMan launch video using ElevenLabs TTS.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=sk_... npx tsx generate-voiceover.ts
 *
 * The API key is read ONLY from the ELEVENLABS_API_KEY environment variable.
 * It is never hardcoded in source code.
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error(
    "Error: ELEVENLABS_API_KEY environment variable is not set.\n" +
      "Run: ELEVENLABS_API_KEY=sk_... npx tsx generate-voiceover.ts"
  );
  process.exit(1);
}

// Voice ID — "Rachel" (confident, youthful, understated)
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

type Scene = {
  id: string;
  text: string;
};

const SCENES: Scene[] = [
  {
    id: "scene-1-intro",
    text: "Everyone uses products. Very few build the right ones.",
  },
  {
    id: "scene-2-identity",
    text: "Meet ProdMan. The Product Management Club at Masters' Union.",
  },
  {
    id: "scene-3-questions",
    text: "Why does this work? Why doesn't it? And how could it be better?",
  },
  {
    id: "scene-4-pillars",
    text: "You discover problems. Design experiences. Validate with data. And build things worth shipping.",
  },
  {
    id: "scene-5-showcase",
    text: "Meet the builders. Explore events. Break down how great products actually work.",
  },
  {
    id: "scene-6-closing",
    text: "This is where curious minds become product builders. ProdMan is live. Build what should exist.",
  },
];

async function generateScene(scene: Scene): Promise<void> {
  console.log(`Generating: ${scene.id}...`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY!,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: scene.text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error (${response.status}): ${errorText}`);
  }

  const audioBuffer = Buffer.from(await response.arrayBuffer());
  const outDir = "public/audio";
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  writeFileSync(`${outDir}/${scene.id}.mp3`, audioBuffer);
  console.log(`  ✓ ${outDir}/${scene.id}.mp3 (${audioBuffer.length} bytes)`);
}

async function main() {
  console.log("Generating ProdMan launch video voiceover...\n");

  for (const scene of SCENES) {
    await generateScene(scene);
  }

  console.log("\nDone! All voiceover files generated in public/audio/");
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
