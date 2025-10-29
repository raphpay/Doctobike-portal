import { describe, expect, it } from "vitest";
import { isEmailValid } from "../validation";

describe("isEmailValid", () => {
  it("returns true for valid email addresses", () => {
    const validEmails = [
      "test@example.com",
      "john.doe@domain.co",
      "alice+promo@sub.domain.io",
      "name.surname123@company.org",
      "contact@my-domain.fr",
    ];

    validEmails.forEach((email) => {
      expect(isEmailValid(email)).toBe(true);
    });
  });

  it("returns false for invalid email addresses", () => {
    const invalidEmails = [
      "plainaddress",
      "@missingusername.com",
      "username@.com",
      "username@domain",
      "username@domain..com",
      "username@domain,com",
      "space @example.com",
      "test@exam_ple.com",
      "",
      "   ",
    ];

    invalidEmails.forEach((email) => {
      expect(isEmailValid(email)).toBe(false);
    });
  });
});
