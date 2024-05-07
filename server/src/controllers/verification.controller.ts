import { NextFunction, Request, Response } from "express";
import { verifyCode } from "../services/verification.services";

/**
 * Verify the code provided in the request body.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 * @return {void} No return value
 */
export const verifyCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<void> => {
  try {
    const code: string = req.body.code;
    const result = await verifyCode(code);

    if (result) {
      res.json({ success: true });
    }

    res.json({ success: false });
  } catch (error) {
    next(error);
  }
};
