import { signOut } from "@/features/auth/api/signOut";
import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
    },
  },
}));

describe("signOut", () => {
  const mockSignOut = supabase.auth.signOut as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("succeed without error when Supabase returns no error", async () => {
    mockSignOut.mockResolvedValueOnce({ error: null });

    await expect(signOut()).resolves.toBeUndefined();

    expect(mockSignOut).toHaveBeenCalled();
  });

  it("throws an error if Supabase returns an error", async () => {
    const fakeError = new Error("Failed to sign out");
    mockSignOut.mockResolvedValueOnce({ error: fakeError });

    await expect(signOut()).rejects.toThrow("Failed to sign out");

    expect(mockSignOut).toHaveBeenCalled();
  });
});
