import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getModels } from "../getModels";

// Mock Supabase
vi.mock("@/lib/supabase", () => {
  return {
    supabase: {
      from: vi.fn(),
    },
  };
});

describe("getModels", () => {
  const mockSelect = vi.fn();
  const mockEq = vi.fn();
  const mockNeq = vi.fn();
  const mockOrder = vi.fn();
  const mockRange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Configure the method "chain" of supabase.from
    (supabase.from as any).mockReturnValue({
      select: mockSelect.mockReturnThis(),
      eq: mockEq.mockReturnThis(),
      neq: mockNeq.mockReturnThis(),
      order: mockOrder.mockReturnThis(),
      range: mockRange.mockReturnThis(),
    });
    // Mock the final promise resolution
    mockRange.mockResolvedValue({ data: [], count: null, error: null });
  });

  it("returns a list of models and total count when Supabase returns data", async () => {
    // Arrange
    const fakeBikes = [
      { model: "Model A" },
      { model: "Model B" },
      { model: "Model C" },
    ];
    const fakeCount = 100;
    mockRange.mockResolvedValueOnce({
      data: fakeBikes,
      count: fakeCount,
      error: null,
    });

    // Act
    const result = await getModels("BrandX", 1);

    // Assert
    expect(supabase.from).toHaveBeenCalledWith("bikes");
    expect(mockSelect).toHaveBeenCalledWith("model", {
      count: "exact",
      head: false,
    });
    expect(mockEq).toHaveBeenCalledWith("brand", "BrandX");
    expect(mockNeq).toHaveBeenCalledWith("model", null);
    expect(mockOrder).toHaveBeenCalledWith("model", { ascending: true });
    expect(mockRange).toHaveBeenCalledWith(0, 39); // Page 1: start=0, end=39
    expect(result).toEqual({
      models: ["Model A", "Model B", "Model C"],
      totalCount: fakeCount,
    });
  });

  it("throws an error if Supabase returns an error", async () => {
    // Arrange
    const fakeError = new Error("Database error");
    mockRange.mockResolvedValueOnce({
      data: null,
      count: null,
      error: fakeError,
    });

    // Act & Assert
    await expect(getModels("BrandX", 1)).rejects.toThrow(fakeError);
    expect(supabase.from).toHaveBeenCalledWith("bikes");
  });

  it("calculates pagination correctly for page 2", async () => {
    // Arrange
    const fakeBikes = [{ model: "Model D" }, { model: "Model E" }];
    const fakeCount = 100;
    mockRange.mockResolvedValueOnce({
      data: fakeBikes,
      count: fakeCount,
      error: null,
    });

    // Act
    const result = await getModels("BrandX", 2);

    // Assert
    expect(mockRange).toHaveBeenCalledWith(40, 79); // Page 2: start=40, end=79
    expect(result).toEqual({
      models: ["Model D", "Model E"],
      totalCount: fakeCount,
    });
  });

  it("returns an empty list and 0 count if no data is found", async () => {
    // Arrange
    mockRange.mockResolvedValueOnce({
      data: [],
      count: 0,
      error: null,
    });

    // Act
    const result = await getModels("BrandX", 1);

    // Assert
    expect(result).toEqual({
      models: [],
      totalCount: 0,
    });
  });
});
