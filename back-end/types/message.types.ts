import { Types } from "mongoose";
import { IRequest } from "./basic.types";

export type TMessageRequestBody = {
  message: string;
};

export type TMessageRequestParams = {
  id: Types.ObjectId
};

export interface ISendMessageRequest extends IRequest<TMessageRequestParams, TMessageRequestBody> {}
