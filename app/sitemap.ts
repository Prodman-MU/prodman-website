import type { MetadataRoute } from "next";
import { members, getFullEvents } from "@/lib/content";

const BASE_URL = "https://prodman-club.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const teamPages = members.map((member) => ({
    url: `${BASE_URL}/team/${member.slug}`,
    lastModified: now,
  }));

  const eventPages = getFullEvents().map((event) => ({
    url: `${BASE_URL}/events/${event.slug}`,
    lastModified: now,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: now,
    },
    ...teamPages,
    ...eventPages,
  ];
}
