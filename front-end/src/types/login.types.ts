import { z } from "zod";

export const loginInputs = z.object({
  username: z.string().min(6).max(18),
  password: z.string().min(6).max(18),
})

export type LoginSchema = z.infer<typeof loginInputs>
