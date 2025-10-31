import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateUserEmail } from "@/features/users/api/updateUserEmail";
import { supabase } from "@/lib/supabase";

// Mock Supabase
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn(),
  },
}));

describe("updateUserEmail", () => {
  const mockUser = {
    id: "123",
    name: "John Doe",
    role: "user",
    email: "new.email@example.com",
    created_at: "2023-01-01T00:00:00Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait mettre à jour l'email et retourner l'utilisateur", async () => {
    // Mock la réponse de Supabase
    vi.mocked(supabase.from().update().eq().select().single).mockResolvedValue({
      data: mockUser,
      error: null,
    });

    const result = await updateUserEmail("123", "new.email@example.com");

    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      role: mockUser.role,
      email: mockUser.email,
      createdAt: mockUser.created_at,
    });
    expect(supabase.from).toHaveBeenCalledWith("users");
    expect(supabase.update).toHaveBeenCalledWith({
      email: "new.email@example.com",
    });
    expect(supabase.eq).toHaveBeenCalledWith("id", "123");
  });

  it("devrait lever une erreur si l'utilisateur n'est pas trouvé", async () => {
    vi.mocked(supabase.from().update().eq().select().single).mockResolvedValue({
      data: null,
      error: { message: "Aucune ligne trouvée" },
    });

    await expect(
      updateUserEmail("999", "new.email@example.com"),
    ).rejects.toThrow("Utilisateur non trouvé");
  });

  it("devrait lever une erreur si la requête échoue", async () => {
    vi.mocked(supabase.from().update().eq().select().single).mockResolvedValue({
      data: null,
      error: { message: "Erreur de base de données" },
    });

    await expect(
      updateUserEmail("123", "new.email@example.com"),
    ).rejects.toThrow("Utilisateur non trouvé");
  });
});
