import createError from "http-errors";
import {
  saveUndertaking,
  getUndertakings,
} from "../services/undertaking.service.js";
import { getUser } from "../services/user.service.js";
import { undertakingErrorCodes } from "../utils/errorCodes/undertaking.errorCodes.js";
import { userErrorCodes } from "../utils/errorCodes/user.errorCodes.js";

export const createUndertakingController = async (req, res, next) => {
  try {
    const { name, description, owner } = req.body;

    //validating owner does exist
    await getUser(owner);

    const undertaking = await saveUndertaking(name, description, owner);
    res.status(201).json(undertaking);
  } catch (err) {
    switch (err.code) {
      case undertakingErrorCodes.UNDERTAKING_ERROR:
        next(createError(500, "Undertaking not created"));
        break;
      case userErrorCodes.USER_NOT_FOUND:
        next(createError(404, err.message));
        break;
      default:
        next(createError(err.status || err.code, err.message));
    }

    console.error(err);
  }
};

export const getUndertakingsController = async (req, res, next) => {
  try {
    const undertaking = await getUndertakings();
    res.status(200).json(undertaking);
  } catch (err) {
    switch (err.code) {
      default:
        next(createError(err.status, err.message));
    }

    console.error(err);
  }
};
