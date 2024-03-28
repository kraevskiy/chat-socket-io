export enum UserGenderEnum {
  male = "male",
  female = "female"
}

export type TUser = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: UserGenderEnum;
}

export type TUserLogin = {
  username: string;
  password: string;
}
