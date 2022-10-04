import express from "express";
import { comparePassword } from "../helpers/bcrypt.helper.js";
import {
  createAccessToken,
  createRefreshToken,
} from "../helpers/jwt.helper.js";
import { loginAdminUserFormValidation } from "../middlewares/formValidation.middleware.js";
import { getAdminUser } from "../models/user/User.model.js";

const Router = express.Router();

// create an admin user
Router.post("/", loginAdminUserFormValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // get user by email
    const user = await getAdminUser({ email });
    if (user?._id) {
      //check if passwords match
      const matched = comparePassword(password, user.password);
      if (matched) {
        // create tokens and store in database
        const accessJWT = await createAccessToken(user._id, user.email);
        const refreshJWT = await createRefreshToken(user._id, user.email);

        // return the token
        return res.json({ status: "success", accessJWT, refreshJWT });
      }
    }
    res.json({
      status: "error",
      message: "Error, Invalid Credentials",
    });
  } catch (error) {
    next(error);
  }
});

export default Router;
