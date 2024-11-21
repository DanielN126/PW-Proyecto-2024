import User from "../models/user.model.js";
import { userErrorCodes } from "../utils/errorCodes/user.errorCodes.js";
import { ServiceError } from "../utils/serviceError.js";

export const existsUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw new ServiceError(
      err.message,
      err.code || userErrorCodes.USER_NOT_FOUND
    );
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw new ServiceError(
      err.message,
      err.code || userErrorCodes.FETCH_USER_ERROR
    );
  }
};

export const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user)
      throw new ServiceError("User not found", userErrorCodes.USER_NOT_FOUND);
    return user;
  } catch (err) {
    throw new ServiceError(
      err.message,
      err.code || userErrorCodes.FETCH_USER_ERROR
    );
  }
};
