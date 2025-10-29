import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createBike } from "../createBike";

// 1️⃣ Mock Supabase
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe("createBike", () => {
  const mockInsert = vi.fn();
  const mockSelect = vi.fn();
  const mockSingle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // 2️⃣ Chain Supabase mocks
    (supabase.from as any).mockReturnValue({
      insert: mockInsert.mockReturnValue({
        select: mockSelect.mockReturnValue({
          single: mockSingle,
        }),
      }),
    });
  });

  it("returns the created bike when Supabase returns data", async () => {
    // 3️⃣ Mock Supabase success
    const fakeInserted = {
      id: "bike-001",
      user_id: "user-123",
      brand: "Trek",
      model: "Domane SL6",
      serial_number: "SN123456",
      purchase_date: "2025-10-10T00:00:00Z",
    };

    mockSingle.mockResolvedValueOnce({ data: fakeInserted });

    // 4️⃣ Call your function
    const result = await createBike({
      userID: "user-123",
      brand: "Trek",
      model: "Domane SL6",
      serialNumber: "SN123456",
      purchaseDate: new Date("2025-10-10T00:00:00Z"),
    });

    // 5️⃣ Assertions
    expect(result).toEqual({
      id: "bike-001",
      userID: "user-123",
      brand: "Trek",
      model: "Domane SL6",
      serialNumber: "SN123456",
      purchaseDate: new Date("2025-10-10T00:00:00Z"),
    });

    expect(supabase.from).toHaveBeenCalledWith("bikes");
    expect(mockInsert).toHaveBeenCalledWith([
      {
        user_id: "user-123",
        brand: "Trek",
        model: "Domane SL6",
        serial_number: "SN123456",
        purchase_date: new Date("2025-10-10T00:00:00Z"),
      },
    ]);
  });

  it("throws an error when Supabase returns an error", async () => {
    // 6️⃣ Mock Supabase error
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { message: "Foreign key constraint violation" },
    });

    await expect(
      createBike({
        userID: "user-404",
        brand: "Giant",
        model: "Defy",
        serialNumber: "SN999999",
        purchaseDate: new Date("2025-10-20T00:00:00Z"),
      }),
    ).rejects.toThrow("Erreur lors de la création du vélo");
  });
});
