import { Request, Response } from "express";
import { UserModel } from "../Models/UserModel";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { isEmailTaken, isUserNameTaken } from "../services/UserService";
import UserModelTypes from "../types/UserTypes";
import { MongoClient } from "mongodb";
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
      ToWatch: [],
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

export async function updateNickname(req: Request, res: Response) {
  try {
    const usernameRegex: RegExp = /^[a-zA-Z0-9][a-zA-Z0-9_]{3,24}$/;

    if (!usernameRegex.test(req.body.newUserName)) {
      return res.json({ message: "Invalid UserName format" });
    }

    const existingUser = await UserModel.findOne({
      UserName: req.body.newUserName,
    });
    if (existingUser) {
      return res.json({ message: "UserName is already taken" });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { UserName: req.body.UserName },
      { $set: { UserName: req.body.newUserName } },
      { new: true }
    );

    if (updatedUser) {
      console.log(
        `Username updated successfully for user with id ${updatedUser._id}.`
      );
      return res.json({ user: updatedUser });
    } else {
      return res.json({ message: "UserName not correct" });
    }
  } catch (err: unknown) {
    console.error("ERROR WHEN UPDATING USERNAME", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateEmail(req: Request, res: Response) {
  try {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const user =
      emailRegex.test(req.body.newEmail) &&
      (await UserModel.findOneAndUpdate(
        { Email: req.body.Email },
        { $set: { Email: req.body.newEmail } },
        { new: true }
      ));

    if (user) {
      console.log(`Email updated successfully for user with id ${user._id}.`);
      return res.json({ user });
    } else {
      return res.json({ message: "Email not correct" });
    }
  } catch (err: unknown) {
    console.log("ERROR WHEN UPDATE USRNAME");
  }
}

export async function UpdatePassword(req: Request, res: Response) {
  try {
    const passwordregex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    const user =
      passwordregex.test(req.body.newPassword) &&
      (await UserModel.findOneAndUpdate(
        { Password: req.body.Password },
        { $set: { Password: req.body.newPassword } },
        { new: true }
      ));

    if (user) {
      console.log(
        `Password updated successfully for user with id ${user._id}.`
      );
      return res.json({ user });
    } else {
      return res.json({ message: "Passowrd not correct" });
    }
  } catch (err: unknown) {
    console.log("ERROR WHEN UPDATE USRNAME");
  }
}

export async function AddAnimeToWatch(req: Request, res: Response) {
  try {
    const { CurrentUser, ToWatch } = req.body;

    // Проверка, есть ли аниме уже в списке To Watch
    const user = await UserModel.findOne({
      UserName: CurrentUser,
      ToWatch: ToWatch,
    });

    if (user) {
      console.log(
        `Anime "${ToWatch}" already exists in To Watch list for user with id ${user._id}.`
      );
      return res.json({ message: "Anime already in To Watch list" });
    }

    // Если аниме еще нет в списке, добавляем его
    const updatedUser = await UserModel.findOneAndUpdate(
      { UserName: CurrentUser },
      { $push: { ToWatch: ToWatch } },
      { new: true } // Чтобы получить обновленный документ
    );

    if (updatedUser) {
      console.log(
        `Anime "${ToWatch}" added to To Watch list for user with id ${updatedUser._id}.`
      );
      return res.json({ user: updatedUser });
    } else {
      return res.json({ message: "To Watch Error" });
    }
  } catch (err: unknown) {
    console.error("ERROR WHEN UPDATING To Watch:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function CheckIsToWatch(req: Request, res: Response) {
  try {
    const animeTitle = req.query.animeTitle as string;
    const userName = req.query.userName as string;
    console.log(animeTitle, "qqq");

    // Проверка, есть ли аниме в списке To Watch
    const user = await UserModel.findOne({
      UserName: userName,
      "ToWatch.AnimeTitle": animeTitle,
    });
    console.log(user);

    const isInToWatchList = Boolean(user);

    res.json({ isInToWatchList });
  } catch (error) {
    console.error("Error checking anime in To Watch list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function RemoveFromToWatch(req: Request, res: Response) {
  try {
    const { userName, animeTitle } = req.body;

    const updatedUser = await UserModel.findOneAndUpdate(
      { UserName: userName },
      { $pull: { ToWatch: { AnimeTitle: animeTitle } } },
      { new: true }
    );

    if (updatedUser) {
      console.log(
        `Anime "${animeTitle}" removed from To Watch list for user with id ${updatedUser._id}.`
      );
      return res.json({ user: updatedUser });
    } else {
      return res.json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error removing anime from To Watch list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getToWatchAnime(req: Request, res: Response) {
  try {
    const userName = req.query.username;

    const user = await UserModel.findOne({ UserName: userName });

    if (user) {
      return res.json({ toWatch: user.ToWatch });
    } else {
      return res.json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error get Anime from  Watch list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
