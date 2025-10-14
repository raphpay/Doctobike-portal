import { signIn } from "@/features/auth/api/signIn";
import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

describe("signIn", () => {
  const mockSignIn = supabase.auth.signInWithPassword as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("return the data if the connection succeed", async () => {
    const fakeResponse = {
      data: { user: { id: "123", email: "test@example.com" } },
      error: null,
    };

    mockSignIn.mockResolvedValueOnce(fakeResponse);

    const result = await signIn("test@example.com", "password123");

    expect(mockSignIn).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });

    expect(result).toEqual(fakeResponse.data);
  });

  it("throws an error if Supabase returns an error", async () => {
    const fakeError = new Error("Invalid login credentials");

    mockSignIn.mockResolvedValueOnce({ data: null, error: fakeError });

    await expect(signIn("wrong@example.com", "badpass")).rejects.toThrow(
      "Invalid login credentials"
    );

    expect(mockSignIn).toHaveBeenCalledWith({
      email: "wrong@example.com",
      password: "badpass",
    });
  });
});
