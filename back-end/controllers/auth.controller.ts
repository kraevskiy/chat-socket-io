import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { TUser, TUserLogin } from "../types";
import { errorTexts, successTexts } from "../texts";
import User from "../models/user.model";
import { errorHandler, generateTokenAndSetCookie } from "../utils";
import { IRequest } from "../types/basic.types";

const avatarHe = "https://avatar.iran.liara.run/public/boy?username=";
const avatarShe = "https://avatar.iran.liara.run/public/girl?username=";

export const signup = async (req: IRequest<TUser>, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: errorTexts.auth.confirmPassword });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: errorTexts.auth.userExist });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const picture = gender === "female" ? avatarShe + username : avatarHe + username;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      picture
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        picture: newUser.picture,
        gender: newUser.gender
      });
    } else {
      res.status(400).json({ error: errorTexts.auth.invalidUser })
    }
  } catch (e) {
    errorHandler(e, res, 'Signup controller');
  }
};

export const login = async (req: IRequest<TUserLogin>, res: Response) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({
        error: errorTexts.auth.notFound
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({error: errorTexts.auth.passwordError});
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      picture: user.picture,
      gender: user.gender
    });
  } catch (e) {
    errorHandler(e, res, 'Login controller');
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({
      message: successTexts.auth.logoutSuccess
    })
  } catch (e) {
    errorHandler(e, res, 'Logout controller');
  }
};
