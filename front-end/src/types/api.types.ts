export type APIUserType = {
  _id: string;
  fullName: string;
  username: string;
  picture: string;
  gender: string;
}

export type APIMessageType = {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type APIUsersTypeItem = APIUserType & { __v: number };
export type APIUsersType = APIUsersTypeItem[];

export type APIErrorType = { error: string; field?: string };

export type APIAnswerType = { message: string };
