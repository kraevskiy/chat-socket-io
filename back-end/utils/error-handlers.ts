import { Response } from "express";
import { errorTexts } from "../texts";
export const errorHandler = (e: any, res: Response, name?: string) => {
  if (e && typeof e === "object" && "message" in e) {
    console.log(`${name ? name + ' - ' : ''}${errorTexts.common["500"]}: ${e.message}`);
  } else {
    console.log(`${name ? name + ' - ' : ''}${errorTexts.common["500"]}: `, e);
  }
  res.status(500).json({ error: errorTexts.common["500"] });
}
