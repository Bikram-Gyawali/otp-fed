import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const schema = Joi.string().length(6).pattern(/^\d+$/).messages({
  "string.base": "Code must be a string",
  "string.length": "Code must be exactly 6 characters long",
  "string.pattern.base": "Code must contain only digits",
});

/**
 * Validates the code received in the request body.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {Promise<string>} The validated code.
 * @throws {Error} If the code is invalid or the last digit is 7.
 */
export const verifyCodeValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = req.body.code?.toString();
  const { error } = schema.validate(code.toString());

  if (error) {
    next(new Error(error.details[0].message));
  }

  if (code.slice(-1) === "7") {
    next(new Error("Last digit cannot be 7"));
  }

  next();
};
