import { describe, it, expect, vi, beforeEach } from "vitest";
import { supabase } from "@/lib/supabase";
import { getClientBikes } from "../getClientBikes";

// ✅ Mock Supabase
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe("getClientBikes", () => {
  const mockSelect = vi.fn();
  const mockEq = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock Supabase method chain
    (supabase.from as any).mockReturnValue({
      select: mockSelect.mockReturnValue({
        eq: mockEq,
      }),
    });
  });

  it("returns a list of bikes when Supabase returns data", async () => {
    const fakeBikes = [
      {
        id: "bike1",
        user_id: "user123",
        model: "Roadster",
        brand: "Canyon",
        serial_number: "ABC123",
        purchase_date: "2023-05-01T00:00:00Z",
      },
      {
        id: "bike2",
        user_id: "user123",
        model: "MountainX",
        brand: "Trek",
        serial_number: "XYZ987",
        purchase_date: "2022-03-15T00:00:00Z",
      },
    ];

    mockEq.mockResolvedValueOnce({ data: fakeBikes, error: null });

    const result = await getClientBikes("user123");

    expect(supabase.from).toHaveBeenCalledWith("bikes");
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(mockEq).toHaveBeenCalledWith("user_id", "user123");

    expect(result).toEqual([
      {
        id: "bike1",
        userID: "user123",
        model: "Roadster",
        brand: "Canyon",
        serialNumber: "ABC123",
        purchaseDate: new Date("2023-05-01T00:00:00Z"),
      },
      {
        id: "bike2",
        userID: "user123",
        model: "MountainX",
        brand: "Trek",
        serialNumber: "XYZ987",
        purchaseDate: new Date("2022-03-15T00:00:00Z"),
      },
    ]);
  });

  it("throws an error when Supabase returns an error", async () => {
    mockEq.mockResolvedValueOnce({
      data: null,
      error: new Error("Erreur lors de la récupération des vélos du client"),
    });

    await expect(getClientBikes("user123")).rejects.toThrow(
      "Erreur lors de la récupération des vélos du client",
    );
  });
});
