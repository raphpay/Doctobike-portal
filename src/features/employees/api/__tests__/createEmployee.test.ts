import { createEmployee } from "@/features/employees/api/createEmployee";
import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";

// ✅ Mock Supabase client
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe("createEmployee", () => {
  const mockInsert = vi.fn();
  const mockSelect = vi.fn();
  const mockSingle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Chain the mock methods used by Supabase
    (supabase.from as any).mockReturnValue({
      insert: mockInsert.mockReturnValue({
        select: mockSelect.mockReturnValue({
          single: mockSingle,
        }),
      }),
    });
  });

  it("returns an Employee when Supabase returns data", async () => {
    // Arrange
    const fakeEmployee = {
      id: "emp-123",
      full_name: "John Doe",
      shop_id: "shop-456",
      user_id: "user-789",
      role_in_shop: "technician",
      created_at: "2024-05-10T10:00:00.000Z",
    };

    mockSingle.mockResolvedValueOnce({ data: fakeEmployee, error: null });

    // Act
    const result = await createEmployee({
      shopID: "shop-456",
      userID: "user-789",
      roleInShop: "technician",
      fullName: "John Doe",
    });

    // Assert
    expect(supabase.from).toHaveBeenCalledWith("employees");
    expect(mockInsert).toHaveBeenCalledWith([
      {
        shop_id: "shop-456",
        user_id: "user-789",
        role_in_shop: "technician",
        full_name: "John Doe",
      },
    ]);
    expect(result).toEqual({
      id: "emp-123",
      shopID: "shop-456",
      userID: "user-789",
      roleInShop: "technician",
      fullName: "John Doe",
      createdAt: new Date("2024-05-10T10:00:00.000Z"),
    });
  });

  it("throws an error when Supabase returns an error", async () => {
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { message: "something went wrong" },
    });

    await expect(
      createEmployee({
        shopID: "shop-123",
        userID: "user-456",
        roleInShop: "manager",
        fullName: "Alice Smith",
      })
    ).rejects.toThrow("Erreur lors de la création de l'employée");
  });
});
