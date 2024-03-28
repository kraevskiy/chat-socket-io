import { Request } from "express";

export interface IRequest<TParams={}, TBody = {}> extends Request<TParams, {}, TBody, {}, {}> {}
export interface IRequestWithBody<TBody = {}> extends Request<{}, {}, TBody> {}
export interface IRequestWithParams<TParams={}> extends Request<TParams> {}
