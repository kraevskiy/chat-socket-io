import { TUser } from "../types";

export interface UserSchema extends Omit<TUser, 'confirmPassword'> {
  picture?: string;
}
