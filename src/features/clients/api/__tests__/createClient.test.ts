import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createClient } from "../createClient";

// 1️⃣ Mock Supabase
vi.mock("@/lib/supabase", () => {
  return {
    supabase: {
      from: vi.fn(),
    },
  };
});

describe("createClient", () => {
  const mockInsert = vi.fn();
  const mockSelect = vi.fn();
  const mockSingle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // 2️⃣ Mock Supabase method chaining
    (supabase.from as any).mockReturnValue({
      insert: mockInsert.mockReturnValue({
        select: mockSelect.mockReturnValue({
          single: mockSingle,
        }),
      }),
    });
  });

  it("returns the created client when Supabase returns data", async () => {
    // 3️⃣ Arrange mock data
    const fakeInserted = {
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      role: "client",
      prefered_shop_id: "shop-001",
      created_at: "2025-10-23T10:00:00Z",
    };

    mockSingle.mockResolvedValueOnce({ data: fakeInserted });

    // 4️⃣ Act
    const result = await createClient({
      name: "John Doe",
      email: "john@example.com",
      preferedShopID: "shop-001",
    });

    // 5️⃣ Assert
    expect(result).toEqual({
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      role: "client",
      createdAt: new Date("2025-10-23T10:00:00Z"),
      preferedShopID: "shop-001",
    });

    expect(supabase.from).toHaveBeenCalledWith("users");
    expect(mockInsert).toHaveBeenCalledWith([
      {
        name: "John Doe",
        email: "john@example.com",
        role: "client",
        prefered_shop_id: "shop-001",
      },
    ]);
  });

  it("throws an error when Supabase returns an error", async () => {
    // 6️⃣ Simulate Supabase error
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { message: "Duplicate email" },
    });

    await expect(
      createClient({
        name: "Jane",
        email: "jane@example.com",
        preferedShopID: "shop-002",
      }),
    ).rejects.toThrow("Erreur lors de la création du client");
  });
});
