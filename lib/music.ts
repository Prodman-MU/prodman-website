import albumSnapshot from "@/resources/music/apple-music-albums.json";

// Official India-storefront metadata, captured from the five supplied Apple
// Music pages on 2026-10-09. Artwork and source URLs are recorded in the snapshot.
function durationSeconds(duration: string): number {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(duration);
  if (!match) throw new Error(`Invalid soundtrack duration: ${duration}`);
  return Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
}

export const soundtracks = albumSnapshot.map((album) => {
  // Use Apple's album duration; rounded individual track times can differ.
  const duration = album.description.match(/Duration: ([^.]+)\./)?.[1];
  if (!duration) throw new Error(`Missing album duration: ${album.id}`);

  return {
    ...album,
    displayTitle: album.title.split(" (")[0],
    edition: album.title.slice(album.title.indexOf(" (") + 1),
    composer: album.artist.map((artist) => artist.name).join(", "),
    year: album.description.match(/\.\s+(\d{4})\./)?.[1],
    durationLabel: duration.replace(/\bhours?\b/g, "hr").replace(/\bminutes?\b/g, "min"),
    tracks: album.tracks.map((track) => {
      const seconds = durationSeconds(track.duration);
      return {
        ...track,
        durationLabel: `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`,
      };
    }),
  };
});

export const soundtrackTrackCount = soundtracks.reduce((sum, album) => sum + album.tracks.length, 0);
