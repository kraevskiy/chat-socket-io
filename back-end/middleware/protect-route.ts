import { Request, Response, NextFunction } from "express";
import { errorHandler, validateToken } from "../utils";
import { errorTexts } from "../texts";
import { UserModel } from "../models";

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: errorTexts.auth.unauthorized });
    }

    const decoded = validateToken(token);
    if (!decoded || !("userId" in decoded)) {
      return res.status(401).json({ error: errorTexts.auth.unauthorized });
    }

    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: errorTexts.auth.notFound });
    }


    req.user = user;
    next();
  } catch (e) {
    errorHandler(e, res, "protect-route middleware");
  }
};
