import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getClients } from "../getClients";

// 1️⃣ Mock Supabase
vi.mock("@/lib/supabase", () => {
  return {
    supabase: {
      from: vi.fn(),
    },
  };
});

describe("getClients", () => {
  const mockSelect = vi.fn();
  const mockEq = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // 2️⃣ Chain supabase methods correctly
    (supabase.from as any).mockReturnValue({
      select: mockSelect.mockReturnValue({
        eq: mockEq,
      }),
    });
  });

  it("returns a list of users when data exists", async () => {
    // 3️⃣ Mock data returned by Supabase
    const fakeUsers = [
      {
        id: "1",
        name: "Alice",
        email: "alice@example.com",
        role: "client",
        prefered_shop_id: "shop-123",
      },
      {
        id: "2",
        name: "Bob",
        email: "bob@example.com",
        role: "client",
        prefered_shop_id: "shop-123",
      },
    ];

    mockEq.mockResolvedValueOnce({ data: fakeUsers });

    // 4️⃣ Call the function
    const result = await getClients("shop-123");

    // 5️⃣ Assertions
    expect(result).toEqual(fakeUsers);
    expect(supabase.from).toHaveBeenCalledWith("users");
    expect(mockEq).toHaveBeenCalledWith("prefered_shop_id", "shop-123");
  });

  it("throws an error when no data is returned", async () => {
    mockEq.mockResolvedValueOnce({ data: null });

    await expect(getClients("shop-999")).rejects.toThrow(
      "Utilisateurs non trouvé",
    );
  });
});
