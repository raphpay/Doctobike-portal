import { getUser } from "@/features/users/api/getUser";
import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase", () => {
  return {
    supabase: {
      from: vi.fn(),
    },
  };
});

describe("getUser", () => {
  const mockSelect = vi.fn();
  const mockEq = vi.fn();
  const mockMaybeSingle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // We configure the method "chain" of supabase
    (supabase.from as any).mockReturnValue({
      select: mockSelect.mockReturnValue({
        eq: mockEq.mockReturnValue({
          maybeSingle: mockMaybeSingle,
        }),
      }),
    });
  });

  it("return a user when supabase returns data", async () => {
    const fakeUser = { id: "123", name: "Alice" };

    mockMaybeSingle.mockResolvedValueOnce({ data: fakeUser });

    const result = await getUser("123");

    expect(result).toEqual(fakeUser);
    expect(supabase.from).toHaveBeenCalledWith("users");
    expect(mockEq).toHaveBeenCalledWith("id", "123");
  });

  it("throws an error if no user is found", async () => {
    mockMaybeSingle.mockResolvedValueOnce({ data: null });

    await expect(getUser("999")).rejects.toThrow("Utilisateur non trouvé");
  });
});
