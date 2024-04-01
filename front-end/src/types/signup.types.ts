import { z } from "zod";

export const signupInputs = z.object({
  fullName: z.string().min(2).max(50),
  username: z.string().min(3).max(18),
  password: z.string().min(6).max(18),
  confirmPassword: z.string().min(6).max(18),
  gender: z.enum(["male", "female"])
})

export type SignupSchema = z.infer<typeof signupInputs>
