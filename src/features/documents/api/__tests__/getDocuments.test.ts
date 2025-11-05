import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDocuments } from "../getDocuments";
import { supabase } from "@/lib/supabase";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe("getDocuments", () => {
  const mockSelect = vi.fn();
  const mockEq = vi.fn();
  const mockRange = vi.fn();
  const mockSingle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // 🪄 Mock du chaînage Supabase
    (supabase.from as any).mockImplementation((table: string) => {
      if (table === "bikes") {
        return {
          select: mockSelect.mockReturnThis(),
          eq: mockEq.mockReturnThis(),
          single: mockSingle,
        };
      }
      if (table === "documents") {
        return {
          select: mockSelect.mockReturnThis(),
          eq: mockEq.mockReturnThis(),
          range: mockRange,
        };
      }
      return {};
    });
  });

  it("should return formatted documents and total count when successful", async () => {
    // 1️⃣ Mock du vélo trouvé
    mockSingle.mockResolvedValueOnce({
      data: { id: "bike-1", brand: "Trek", model: "Domane", year: "2022" },
      error: null,
    });

    // 2️⃣ Mock des documents associés
    mockRange.mockResolvedValueOnce({
      data: [
        {
          id: "doc-1",
          bike_id: "bike-1",
          name: "Notice",
          type: "pdf",
          path: "/files/notice.pdf",
          created_at: "2024-01-15T10:00:00Z",
        },
      ],
      count: 1,
      error: null,
    });

    const result = await getDocuments("Trek", "Domane", "2022", 1);

    expect(supabase.from).toHaveBeenCalledWith("bikes");
    expect(mockEq).toHaveBeenCalledWith("year", "2022");
    expect(supabase.from).toHaveBeenCalledWith("documents");
    expect(result).toEqual({
      documents: [
        {
          id: "doc-1",
          bikeID: "bike-1",
          name: "Notice",
          type: "pdf",
          path: "/files/notice.pdf",
          createdAt: new Date("2024-01-15T10:00:00Z"),
        },
      ],
      totalCount: 1,
    });
  });

  it("should throw an error if the bike is not found", async () => {
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: null,
    });

    await expect(getDocuments("Trek", "Domane", "2025", 1)).rejects.toThrow(
      "Vélo non trouvé",
    );
  });

  it("should throw an error if Supabase returns an error for bike", async () => {
    const error = new Error("Bike fetch error");
    mockSingle.mockResolvedValueOnce({
      data: null,
      error,
    });

    await expect(getDocuments("Trek", "Domane", "2025", 1)).rejects.toThrow(
      "Bike fetch error",
    );
  });

  it("should throw an error if Supabase returns an error for documents", async () => {
    mockSingle.mockResolvedValueOnce({
      data: { id: "bike-1" },
      error: null,
    });

    const docError = new Error("Documents fetch error");
    mockRange.mockResolvedValueOnce({
      data: null,
      count: null,
      error: docError,
    });

    await expect(getDocuments("Trek", "Domane", "2022", 1)).rejects.toThrow(
      "Documents fetch error",
    );
  });

  it("should handle null count gracefully", async () => {
    mockSingle.mockResolvedValueOnce({
      data: { id: "bike-1" },
      error: null,
    });

    mockRange.mockResolvedValueOnce({
      data: [],
      count: null,
      error: null,
    });

    const result = await getDocuments("Trek", "Domane", "2022", 1);
    expect(result.totalCount).toBe(0);
  });

  it("should compute correct pagination range", async () => {
    mockSingle.mockResolvedValueOnce({
      data: { id: "bike-1" },
      error: null,
    });

    mockRange.mockResolvedValueOnce({
      data: [],
      count: 0,
      error: null,
    });

    await getDocuments("Trek", "Domane", "2022", 2);
    // PAGE_SIZE = 40 → page 2 → start = 40, end = 79
    const [start, end] = mockRange.mock.calls[0];
    expect(start).toBe(40);
    expect(end).toBe(79);
  });
});
