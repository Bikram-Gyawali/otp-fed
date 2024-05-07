import { verifyCode } from "../src/services/verification.services";

describe("verifyCode function", () => {
  test('should return "Verification Successful" for valid code', async () => {
    const validCode = "123456";
    const result = await verifyCode(validCode);
    expect(result).toBe(true);
  });

  test('should throw "Verification Error: Last digit cannot be 7" for code ending with 7', async () => {
    const invalidCode = "123457";
    const result = await verifyCode(invalidCode);
    await expect(result).toBe(false);
  });

  test('should throw "Verification Error" for code with invalid length', async () => {
    const invalidCode = "12345";
    const result = await verifyCode(invalidCode);
    await expect(result).toBe(false);
  });

  test('should throw "Verification Error" for code containing non-digit characters', async () => {
    const invalidCode = "12a456";
    const result = await verifyCode(invalidCode);
    await expect(result).toBe(false);
  });
});
