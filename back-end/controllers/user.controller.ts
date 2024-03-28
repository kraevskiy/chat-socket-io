import { Response } from "express";
import { IUserRequest } from "../types/user.types";
import { errorHandler } from "../utils";
import { UserModel } from "../models";

export const getUsersForSidebar = async (req: IUserRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id;
    const filteredUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);

  } catch (e) {
    errorHandler(e, res, "GetUsersForSidebar controller");
  }
};
