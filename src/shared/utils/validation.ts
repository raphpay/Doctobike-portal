/**
 * Checks if an email address is valid.
 * @param input - The email address to validate.
 * @returns A boolean indicating whether the email address is valid or not.
 */
export function isEmailValid(input: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
  return regex.test(input.trim());
}
