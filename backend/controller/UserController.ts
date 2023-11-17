import { Request, Response } from "express";
import { UserModel } from "../Models/UserModel";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { isEmailTaken, isUserNameTaken } from "../services/UserService";
import UserModelTypes from "../types/UserTypes";
export const Registration = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const emailTaken = await isEmailTaken(req.body.Email);
    const userNameTaken = await isUserNameTaken(req.body.UserName);

    if (emailTaken || userNameTaken) {
      const errorResponse: {
        message: string;
        EmailError?: string;
        UserNameError?: string;
      } = {
        message: "Validation failed",
      };
      if (emailTaken) {
        errorResponse.EmailError = "Email already taken";
      }
      if (userNameTaken) {
        errorResponse.UserNameError = "UserName already taken";
      }
      return res.status(400).json(errorResponse);
    }

    const doc = new UserModel<UserModelTypes>({
      Email: req.body.Email,
      UserName: req.body.UserName,
      Password: req.body.Password,
    });

    const user = await doc.save();
    return res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("register error", err);
  }
};

export const LogIn = async (req: Request, res: Response) => {
  console.log("in logIn", req.body);

  const user: UserModelTypes | null = await UserModel.findOne({
    UserName: req.body.UserName,
  });
  if (!user) {
    return res.status(404).json({
      message: "Неверная почта или пароль",
    });
  }
  const isValidPass = (await req.body.Password) === user.Password;

  if (!isValidPass) {
    return res.json({ message: "Неверная почта или пароль" });
  }
  const token = jwt.sign({ UserName: user.UserName }, "bodya", {
    expiresIn: "30d",
  });
  return res
    .status(200)
    .json({ message: "User Login successfully", token, user });
};
