import jwt from "jsonwebtoken";
import { storeAccessJWT } from "../models/session/Session.model.js";
import { updateAdminUser } from "../models/user/User.model.js";

export const createAccessToken = async (_id, email) => {
  const accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });

  const tokenObj = {
    userId: _id,
    token: accessJWT,
  };

  const result = await storeAccessJWT(tokenObj);
  return result?.token;
};

export const createRefreshToken = async (_id, email) => {
  const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  const filter = {
    _id,
  };

  const tokenObj = {
    "refreshJWT.token": refreshJWT,
    "refreshJWT.addedAt": Date.now(),
  };

  const result = await updateAdminUser(filter, tokenObj);
  return result?.refreshJWT?.token;
};
