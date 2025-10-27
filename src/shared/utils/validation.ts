/**
 * Checks if an email address is valid.
 * @param input - The email address to validate.
 * @returns A boolean indicating whether the email address is valid or not.
 */
export function isEmailValid(input: string): boolean {
  const regex: RegExp = /[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}/;
  const isValid: boolean = regex.test(input);
  return isValid;
}
