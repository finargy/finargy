/**
 * It returns true if the email is valid, false otherwise
 * @param {string} email - The email address to validate.
 * @returns A boolean value.
 */
export const isValidEmail = (email: string): boolean => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

  return !!match;
};

/**
 * "If the email is valid, return undefined, otherwise return a string."
 *
 * The function isValidEmail is a custom function that I wrote. It's not part of the
 * React libraries
 * @param {string} email - string - The value of the input field
 * @returns A function that takes an email and returns a string or undefined.
 */
export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email) ? undefined : "El correo no parece ser válido";
};
