# Event soundtracks

`apple-music-albums.json` is a static snapshot captured on 2026-10-09 from the
five India-storefront album URLs supplied by the project owner. Names, artists,
track order, durations, and song links come from each page's `MusicAlbum` JSON-LD.
The cover URL comes from the album's artwork dictionary in the page's serialized
server data. The exact album URLs and downloaded artwork source URLs are retained
in the snapshot.

The original square artwork is stored at `public/events/music/*.jpg`, at 800px,
and rendered with Next/Image. The page does not call Apple APIs at runtime or
embed a player. Metadata is a snapshot rather than an automatically refreshed
catalog. All listening links open Apple Music in a new tab.

Keep the linked editions: Infinity War is the Deluxe Edition; Cosmos is Volume 4.
When refreshing, fetch the same supplied album pages, preserve the ordered track
list and canonical URLs, and replace the matching cover only after inspecting it.
No music files or previews are downloaded or served by this website.
