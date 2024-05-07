/**
 * Verifies a code.
 *
 * @param {string} code - The code to be verified.
 * @return {Promise<boolean>} Returns true if the code is valid, false otherwise.
 */
export const verifyCode = async (code: string): Promise<boolean> => {
  if (code.length !== 6 || code.slice(-1) === "7") {
    return false;
  }

  if (!/^\d+$/.test(code)) {
    return false;
  }

  return true;
};
