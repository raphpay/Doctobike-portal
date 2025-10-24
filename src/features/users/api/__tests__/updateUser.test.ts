import { updateUser } from "@/features/users/api/updateUser";
import { supabase } from "@/lib/supabase";
import { beforeEach, describe, expect, it, vi } from "vitest";

// ✅ Mock Supabase client
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe("updateUser", () => {
  const mockUpdate = vi.fn();
  const mockEq = vi.fn();
  const mockSelect = vi.fn();
  const mockSingle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Configure Supabase mock chain
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

  it("returns updated user when Supabase returns data", async () => {
    // Arrange
    const fakeUser = {
      id: "user-123",
      name: "Updated Name",
      role: "employee",
      email: "test@example.com",
    };

    mockSingle.mockResolvedValueOnce({ data: fakeUser, error: null });

    // Act
    const result = await updateUser("user-123", {
      name: "Updated Name",
      role: "employee",
    });

    // Assert
    expect(supabase.from).toHaveBeenCalledWith("users");
    expect(mockUpdate).toHaveBeenCalledWith({
      name: "Updated Name",
      role: "employee",
    });
    expect(mockEq).toHaveBeenCalledWith("id", "user-123");
    expect(result).toEqual(fakeUser);
  });

  it("throws an error when no user is returned", async () => {
    mockSingle.mockResolvedValueOnce({ data: null, error: null });

    await expect(
      updateUser("missing-user", {
        name: "Nobody",
        role: "client",
      })
    ).rejects.toThrow("Utilisateur non trouvé");
  });

  it("throws when Supabase returns an error", async () => {
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { message: "update failed" },
    });

    await expect(
      updateUser("user-err", { name: "Error", role: "employee" })
    ).rejects.toThrow("Utilisateur non trouvé");
  });
});
