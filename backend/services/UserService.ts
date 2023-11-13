import { UserModel } from "../Models/UserModel";

export const isEmailTaken = async (Email: string) => {
  try {
    const user = await UserModel.findOne({ Email });
    return user ? true : false;
  } catch (error) {
    console.log(error);
    throw new Error("Error checking email availability");
  }
};

export const isUserNameTaken = async (UserName: string) => {
  try {
    const user = await UserModel.findOne({ UserName });
    return user ? true : false;
  } catch (error) {
    console.log(error);
    throw new Error("Error checking userName availability");
  }
};
