import { describe, it, expect, vi, beforeEach } from "vitest";
import { getYears } from "../getYears";
import { supabase } from "@/lib/supabase";

// 🧩 On mock toutes les méthodes chaînées utilisées
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe("getYears", () => {
  const mockSelect = vi.fn();
  const mockEq = vi.fn();
  const mockNeq = vi.fn();
  const mockOrder = vi.fn();
  const mockRange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // 🪄 On simule le chaînage fluide des appels supabase
    (supabase.from as any).mockReturnValue({
      select: mockSelect.mockReturnThis(),
      eq: mockEq.mockReturnThis(),
      neq: mockNeq.mockReturnThis(),
      order: mockOrder.mockReturnThis(),
      range: mockRange,
    });
  });

  it("should return formatted years and total count when successful", async () => {
    // 👉 On simule la réponse supabase
    mockRange.mockResolvedValueOnce({
      data: [{ year: 2021 }, { year: 2022 }],
      count: 2,
      error: null,
    });

    const result = await getYears("Trek", "Domane", 1);

    // ✅ Vérifications
    expect(supabase.from).toHaveBeenCalledWith("bikes");
    expect(mockSelect).toHaveBeenCalledWith("year", {
      count: "exact",
      head: false,
    });
    expect(mockEq).toHaveBeenCalledWith("brand", "Trek");
    expect(mockOrder).toHaveBeenCalledWith("year", { ascending: true });
    expect(result).toEqual({
      years: [{ year: 2021 }, { year: 2022 }],
      totalCount: 2,
    });
  });

  it("should handle null count gracefully", async () => {
    mockRange.mockResolvedValueOnce({
      data: [{ year: 2020 }],
      count: null,
      error: null,
    });

    const result = await getYears("Specialized", "Roubaix", 1);

    expect(result.totalCount).toBe(0);
    expect(result.years).toHaveLength(1);
  });

  it("should throw an error when Supabase returns an error", async () => {
    const supabaseError = new Error("Database error");
    mockRange.mockResolvedValueOnce({
      data: null,
      count: null,
      error: supabaseError,
    });

    await expect(getYears("Cannondale", "Synapse", 1)).rejects.toThrow(
      "Database error",
    );
  });
});
