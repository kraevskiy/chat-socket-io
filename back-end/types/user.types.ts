import { Types } from "mongoose";
import { IRequestWithParams } from "./basic.types";

export type TUserRequestParams = {
  id: Types.ObjectId
};

export interface IUserRequest extends IRequestWithParams<TUserRequestParams> {}
