import Undertaking from "../models/undertaking.model.js";
import { undertakingErrorCodes } from "../utils/errorCodes/undertaking.errorCodes.js";
import { ServiceError } from "../utils/serviceError.js";

export const saveUndertaking = async (name, description, owner) => {
  try {
    const newUndertaking = new Undertaking({ name, description, owner });
    if (!newUndertaking)
      throw new ServiceError(
        "Undertaking not created",
        undertakingErrorCodes.UNDERTAKING_NOT_CREATED
      );
    await newUndertaking.save();
    return newUndertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const getUndertakings = async () => {
  try {
    const undertaking = (await Undertaking.find()) || [];
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const getUndertakingById = async (undertakingId) => {
  try {
    const undertaking = await Undertaking.findById(undertakingId);
    if (!undertaking)
      throw new ServiceError(
        "Undertaking not found",
        undertakingErrorCodes.UNDERTAKING_NOT_FOUND
      );
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const getUndertakingsByOwner = async (ownerId) => {
  try {
    const undertaking = (await Undertaking.find({ owner: ownerId })) || [];
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const deleteUndertaking = async (undertakingId) => {
  try {
    const event = await Undertaking.findByIdAndDelete(undertakingErrorCodes);
    if (!event)
      throw new ServiceError(
        "Event not found",
        undertakingErrorCodes.EVENT_NOT_FOUND
      );
    return event;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const updateUndertaking = async (
  undertakingId,
  name,
  description,
  status,
  photos,
  likes,
  dislikes
) => {
  try {
    const undertaking = await Undertaking.findByIdAndUpdate(
      undertakingId,
      { name, description, status, photos, likes, dislikes },
      { new: true }
    );
    if (!undertaking)
      throw new ServiceError(
        "Undertaking not found",
        undertakingErrorCodes.UNDERTAKING_NOT_FOUND
      );
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const toggleLike = async (undertakingId, userId) => {
  try {
    const undertaking = await getUndertakingById(undertakingId);
    if (undertaking.likes.includes(userId))
      undertaking.likes = undertaking.likes.filter((id) => id !== userId);
    else undertaking.likes.push(userId);

    await undertaking.save();
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const toggleDislike = async (undertakingId, userId) => {
  try {
    const undertaking = await getUndertakingById(undertakingId);
    if (undertaking.dislikes.includes(userId))
      undertaking.dislikes = undertaking.dislikes.filter((id) => id !== userId);
    else undertaking.dislikes.push(userId);

    await undertaking.save();
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};

export const toggleComments = async (undertakingId, commentId) => {
  try {
    const undertaking = await getUndertakingById(undertakingId);
    if (undertaking.comments.includes(commentId))
      undertaking.comments = undertaking.comments.filter(
        (id) => id !== commentId
      );
    else undertaking.comments.push(commentId);

    await undertaking.save();
    return undertaking;
  } catch (e) {
    throw new ServiceError(
      e.message,
      e.code || undertakingErrorCodes.UNDERTAKING_ERROR
    );
  }
};
