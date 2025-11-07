import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateUserEmail } from "@/features/users/api/updateUserEmail";
import { supabase } from "@/lib/supabase";

// --- Mock Supabase client ---
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe("updateUserEmail", () => {
  const mockUpdate = vi.fn();
  const mockEq = vi.fn();
  const mockSelect = vi.fn();
  const mockSingle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Chain supabase.from("users").update().eq().select().single()
    (supabase.from as any).mockReturnValue({
      update: mockUpdate.mockReturnValue({
        eq: mockEq.mockReturnValue({
          select: mockSelect.mockReturnValue({
            single: mockSingle,
          }),
        }),
      }),
    });
  });

  it("updates user email and returns the updated user", async () => {
    const fakeUser = {
      id: "123",
      name: "John Doe",
      role: "client",
      email: "newemail@example.com",
      created_at: "2025-10-29T10:00:00Z",
    };

    // Mock Supabase response
    mockSingle.mockResolvedValueOnce({
      data: fakeUser,
      error: null,
    });

    const result = await updateUserEmail("123", "newemail@example.com");

    expect(result).toEqual({
      id: "123",
      name: "John Doe",
      role: "client",
      email: "newemail@example.com",
      createdAt: "2025-10-29T10:00:00Z",
    });

    expect(supabase.from).toHaveBeenCalledWith("users");
    expect(mockUpdate).toHaveBeenCalledWith({ email: "newemail@example.com" });
    expect(mockEq).toHaveBeenCalledWith("id", "123");
  });

  it("throws an error if the user is not found", async () => {
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { message: "No user found" },
    });

    await expect(updateUserEmail("999", "fake@example.com")).rejects.toThrow(
      "Utilisateur non trouvé",
    );
  });
});
