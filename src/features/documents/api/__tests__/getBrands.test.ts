import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getBrands } from "../getBrands";

// Mock Supabase
vi.mock("@/lib/supabase", () => {
  return {
    supabase: {
      rpc: vi.fn(),
    },
  };
});

describe("getBrands", () => {
  // const mockRpc = vi.fn();
  const mockOrder = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Configure the method "chain" of supabase.rpc
    (supabase.rpc as any).mockReturnValue({
      order: mockOrder.mockReturnThis(),
    });
    // Mock the final promise resolution
    mockOrder.mockResolvedValue({ data: null, error: null });
  });

  it("returns a list of brands when Supabase returns data", async () => {
    // Arrange
    const fakeBrands = [
      { id: "1", brand: "Brand A" },
      { id: "2", brand: "Brand B" },
    ];
    mockOrder.mockResolvedValueOnce({ data: fakeBrands, error: null });

    // Act
    const result = await getBrands();

    // Assert
    expect(supabase.rpc).toHaveBeenCalledWith("get_unique_brands");
    expect(mockOrder).toHaveBeenCalledWith("brand", { ascending: true });
    expect(result).toEqual(fakeBrands);
  });

  it("throws an error if Supabase returns an error", async () => {
    // Arrange
    const fakeError = new Error("Database error");
    mockOrder.mockResolvedValueOnce({ data: null, error: fakeError });

    // Act & Assert
    await expect(getBrands()).rejects.toThrow(fakeError);
    expect(supabase.rpc).toHaveBeenCalledWith("get_unique_brands");
  });
});
