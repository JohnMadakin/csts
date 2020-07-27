export interface IUser {
  email: string,
  verified?: boolean,
  password: string,
  name: string,
  role: IRole,
  accountVerifyToken?: string,
  accountVerifyTokenExpires?: Date,
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date
}

export interface IProfile {
  location?: string,
  gender?: string,
  imageUrl?: string
}

export interface IRole {
  name: string,
}
