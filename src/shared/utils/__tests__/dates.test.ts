import { describe, it, expect } from "vitest";
import { fr, enUS } from "date-fns/locale";
import { formatDate } from "../dates";

describe("formatDate", () => {
  it("formats a valid Date object correctly (FR)", () => {
    const date = new Date("2025-10-18T00:00:00Z");
    const formatted = formatDate(date, fr);
    expect(formatted.toLowerCase()).toContain("18"); // day check
    expect(formatted.toLowerCase()).toContain("oct"); // month check
  });

  it("formats a date string correctly (FR)", () => {
    const formatted = formatDate("2025-10-18", fr);
    expect(formatted.toLowerCase()).toContain("18");
    expect(formatted.toLowerCase()).toContain("oct");
  });

  it("formats with English locale when specified", () => {
    const formatted = formatDate(new Date("2025-10-18"), enUS);
    expect(formatted).toMatch(/Oct|oct/i);
  });

  it("returns empty string for null", () => {
    expect(formatDate(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(formatDate(undefined)).toBe("");
  });
});
