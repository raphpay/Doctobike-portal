import { getShop } from "@/features/shop/api/getShop";
import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase", () => {
  return {
    supabase: {
      from: vi.fn(),
    },
  };
});

describe("createShopCode", () => {
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

  it("return the complete Shop", async () => {
    const now = new Date();
    const fakeShop = {
      id: "123",
      group_id: "456",
      name: "shop",
      address: "address",
      phone: "0612345678",
      created_at: now,
    };

    mockSingle.mockResolvedValueOnce({ data: fakeShop });

    const result = await getShop(fakeShop.id);

    expect(result).toEqual({
      id: fakeShop.id,
      groupID: fakeShop.group_id,
      name: fakeShop.name,
      address: fakeShop.address,
      phone: fakeShop.phone,
      createdAt: fakeShop.created_at,
    });
    expect(supabase.from).toHaveBeenCalledWith("shops");
    expect(mockEq).toHaveBeenCalledWith("id", "123");
  });

  it("throws an error if no shop is found", async () => {
    mockSingle.mockResolvedValueOnce({ data: null });
    await expect(getShop("999")).rejects.toThrow("Magasin non trouvé");
  });
});
