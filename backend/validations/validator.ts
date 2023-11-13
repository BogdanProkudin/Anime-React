import { body } from "express-validator";

export const RegistrValdation = [
  body("email", "Email is not correct").isEmail(),
  body("password", "password is not correct").isLength({ min: 4, max: 30 }),
  body("userName", "name is not correct").isLength({ min: 3, max: 20 }),
  body("avatar").optional().isURL(),
];

export const PostValidation = [
  body("title", "must write title").isLength({ min: 4, max: 40 }),
  body("text", "must write text").isLength({ min: 4, max: 40 }),
  body("image").optional().isURL(),
  body("tags", "tags is not correct").optional().isArray(),
];
