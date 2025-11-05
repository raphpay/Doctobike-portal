import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDocumentSignedUrl } from "@/features/documents/api/getDocumentSignedUrl";
import { supabase } from "@/lib/supabase";

// --- Mock the supabase client ---
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
    storage: {
      from: vi.fn(),
    },
  },
}));

describe("getDocumentSignedUrl", () => {
  const mockSelect = vi.fn();
  const mockEq = vi.fn();
  const mockSingle = vi.fn();

  const mockCreateSignedUrl = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock supabase.from("documents") call chain
    (supabase.from as any).mockReturnValue({
      select: mockSelect.mockReturnValue({
        eq: mockEq.mockReturnValue({
          single: mockSingle,
        }),
      }),
    });

    // Mock supabase.storage.from("bike-documents")
    (supabase.storage.from as any).mockReturnValue({
      createSignedUrl: mockCreateSignedUrl,
    });
  });

  it("returns a signed URL when document exists and URL is generated successfully", async () => {
    // Mock document fetch
    mockSingle.mockResolvedValueOnce({
      data: { path: "docs/bike1/manual.pdf" },
      error: null,
    });

    // Mock signed URL creation
    mockCreateSignedUrl.mockResolvedValueOnce({
      data: { signedUrl: "https://signed-url.com/manual.pdf" },
      error: null,
    });

    const result = await getDocumentSignedUrl("123");

    expect(result).toBe("https://signed-url.com/manual.pdf");
    expect(supabase.from).toHaveBeenCalledWith("documents");
    expect(mockEq).toHaveBeenCalledWith("id", "123");
    expect(supabase.storage.from).toHaveBeenCalledWith("bike-documents");
    expect(mockCreateSignedUrl).toHaveBeenCalledWith(
      "docs/bike1/manual.pdf",
      3600,
    );
  });

  it("throws an error if the document is not found", async () => {
    mockSingle.mockResolvedValueOnce({ data: null, error: null });

    await expect(getDocumentSignedUrl("404")).rejects.toThrow(
      "Document non trouvé",
    );
  });

  it("throws an error if signed URL generation fails", async () => {
    mockSingle.mockResolvedValueOnce({
      data: { path: "docs/bike2/manual.pdf" },
      error: null,
    });

    mockCreateSignedUrl.mockResolvedValueOnce({
      data: null,
      error: { message: "Storage error" },
    });

    await expect(getDocumentSignedUrl("456")).rejects.toThrow(
      "Impossible de générer le lien",
    );
  });
});
