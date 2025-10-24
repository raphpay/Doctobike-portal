import { signUp } from "@/features/auth/api/signUp";
import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
    },
  },
}));

describe("signUp", () => {
  const mockSignUp = supabase.auth.signUp as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("succeed without error when Supabase returns no error", async () => {
    const fakeResponse = {
      data: { user: { id: "123", email: "test@example.com" } },
      error: null,
    };

    mockSignUp.mockResolvedValueOnce(fakeResponse);

    const result = await signUp("test@example.com", "password123");

    expect(mockSignUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });

    expect(result).toEqual(fakeResponse.data);
  });

  it("throws an error if Supabase returns an error", async () => {
    const fakeError = new Error("Failed to sign up");
    mockSignUp.mockResolvedValueOnce({ error: fakeError });

    await expect(signUp("wrong@example.com", "badpass")).rejects.toThrow(
      "Failed to sign up"
    );

    expect(mockSignUp).toHaveBeenCalledWith({
      email: "wrong@example.com",
      password: "badpass",
    });
  });
});
