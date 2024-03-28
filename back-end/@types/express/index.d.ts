import { Types } from "mongoose";
import { UserSchema } from "../../schemas";

type UserRequest = Omit<UserSchema, 'password'>;

declare global {
  namespace Express {
    interface Request {
      user?: Document<unknown, {}, UserSchema> & UserSchema & {_id: Types.ObjectId}
    }
  }
}
