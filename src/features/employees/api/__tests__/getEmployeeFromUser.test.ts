import { getEmployeeFromUser } from "@/features/employees/api/getEmployeeFromUser";
import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase", () => {
  return {
    supabase: {
      from: vi.fn(),
    },
  };
});

describe("getEmployeeFromUser", () => {
  const mockSelect = vi.fn();
  const mockEq = vi.fn();
  const mockSingle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // We configure the method "chain" of supabase
    (supabase.from as any).mockReturnValue({
      select: mockSelect.mockReturnValue({
        eq: mockEq.mockReturnValue({
          single: mockSingle,
        }),
      }),
    });
  });

  it("return the complete Employee", async () => {
    const fakeEmployee = {
      id: "123",
      shop_id: "456",
      user_id: "789",
      full_name: "shop",
      created_at: new Date(),
      role_in_shop: "assistant",
    };

    mockSingle.mockResolvedValueOnce({ data: fakeEmployee });

    const result = await getEmployeeFromUser(fakeEmployee.user_id);

    expect(result).toEqual({
      id: fakeEmployee.id,
      shopID: fakeEmployee.shop_id,
      userID: fakeEmployee.user_id,
      fullName: fakeEmployee.full_name,
      createdAt: fakeEmployee.created_at,
      roleInShop: fakeEmployee.role_in_shop,
    });
    expect(supabase.from).toHaveBeenCalledWith("employees");
    expect(mockEq).toHaveBeenCalledWith("user_id", fakeEmployee.user_id);
  });

  it("throws an error if no employee is found", async () => {
    mockSingle.mockResolvedValueOnce({ data: null });
    await expect(getEmployeeFromUser("999")).rejects.toThrow(
      "Employé non trouvé"
    );
  });
});
