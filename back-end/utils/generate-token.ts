import jwt from "jsonwebtoken";
import { Response } from "express";
import { errorTexts } from "../texts";
import { Types } from "mongoose";

export const generateTokenAndSetCookie = (userId: Types.ObjectId, res: Response) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error(errorTexts.common.jwtError);
  } else {
    const token = jwt.sign({ userId }, jwtSecret, {
      expiresIn: "15d"
    });
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    });
  }
};
