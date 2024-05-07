import { Router } from "express";
import { verifyCodeController } from "../controllers/verification.controller";
import { verifyCodeValidator } from "../validator/token.validator";

const express = require("express");
const router = express.Router();

// Routes for verification of code
router.post("/verify", 
verifyCodeValidator,
verifyCodeController);

export const verificationRoutes : Router= router;