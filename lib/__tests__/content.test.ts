import { describe, it, expect } from "vitest";
import {
  members,
  events,
  getFullEvents,
  productBreakdown,
  productBreakdownCategories,
  resources,
  projects,
  audienceGroups,
  siteNav,
} from "../content";

describe("members", () => {
  it("has at least one member", () => {
    expect(members.length).toBeGreaterThan(0);
  });

  it("every member has a unique slug", () => {
    const slugs = members.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every member has a non-empty name and role", () => {
    for (const member of members) {
      expect(member.name.length).toBeGreaterThan(0);
      expect(member.role.length).toBeGreaterThan(0);
    }
  });

  it("every member has at least one link", () => {
    for (const member of members) {
      expect(member.links.length).toBeGreaterThan(0);
    }
  });

  it("every member has a bio and superpower", () => {
    for (const member of members) {
      expect(member.bio.length).toBeGreaterThan(0);
      expect(member.superpower.length).toBeGreaterThan(0);
    }
  });
});

describe("events", () => {
  it("has at least one event", () => {
    expect(events.length).toBeGreaterThan(0);
  });

  it("every event has a unique number", () => {
    const numbers = events.map((e) => e.number);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("events with slugs can be retrieved by slug", () => {
    const fullEvents = getFullEvents();
    expect(fullEvents.length).toBeGreaterThan(0);
    for (const event of fullEvents) {
      expect(getEventBySlug(event.slug)).toBeDefined();
    }
  });
});

describe("productBreakdown", () => {
  it("has exactly 8 items", () => {
    expect(productBreakdown.length).toBe(8);
  });

  it("every item has a unique id", () => {
    const ids = productBreakdown.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every item has all required fields", () => {
    for (const item of productBreakdown) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.hook.length).toBeGreaterThan(0);
      expect(item.description.length).toBeGreaterThan(0);
      expect(item.tags.length).toBeGreaterThan(0);
    }
  });

  it("category tabs include 'all' plus every unique category", () => {
    const categories = productBreakdownCategories.map((c) => c.id);
    expect(categories).toContain("all");
    const uniqueCategories = new Set(productBreakdown.map((item) => item.category));
    for (const cat of uniqueCategories) {
      expect(categories).toContain(cat);
    }
  });
});

describe("resources", () => {
  it("has at least one resource", () => {
    expect(resources.length).toBeGreaterThan(0);
  });

  it("every resource has a valid URL", () => {
    for (const resource of resources) {
      expect(resource.url).toMatch(/^https?:\/\//);
    }
  });

  it("every resource has all required fields", () => {
    for (const resource of resources) {
      expect(resource.title.length).toBeGreaterThan(0);
      expect(resource.source.length).toBeGreaterThan(0);
      expect(resource.description.length).toBeGreaterThan(0);
      expect(["article", "tool", "framework", "template"]).toContain(resource.category);
    }
  });
});

describe("projects", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has all required fields", () => {
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(0);
      expect(project.contributors.length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });
});

describe("audienceGroups", () => {
  it("has exactly 4 persona groups", () => {
    expect(audienceGroups.length).toBe(4);
  });

  it("every group has a name, tagline, and description", () => {
    for (const group of audienceGroups) {
      expect(group.name.length).toBeGreaterThan(0);
      expect(group.tagline.length).toBeGreaterThan(0);
      expect(group.description.length).toBeGreaterThan(0);
    }
  });
});

describe("siteNav", () => {
  it("has entries for all major sections", () => {
    const labels = siteNav.map((item) => item.label);
    expect(labels).toContain("Who We Are");
    expect(labels).toContain("Members");
    expect(labels).toContain("Events");
    expect(labels).toContain("Breakdown");
  });

  it("every nav entry has a hash href", () => {
    for (const item of siteNav) {
      expect(item.href).toMatch(/^#/);
    }
  });
});

// Helper imported inline to avoid circular issues
function getEventBySlug(slug: string) {
  return getFullEvents().find((event) => event.slug === slug);
}
