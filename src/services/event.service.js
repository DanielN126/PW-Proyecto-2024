import Event from "../models/event.model.js";
import { eventErrorCodes } from "../utils/errorCodes/event.errorCodes.js";
import { ServiceError } from "../utils/serviceError.js";

export const saveEvent = async (
  name,
  description,
  quotas,
  location,
  date,
  undertakingId
) => {
  try {
    const newEvent = new Event(
      name,
      description,
      quotas,
      location,
      date,
      undertakingId
    );
    if (!newEvent)
      throw new ServiceError(
        "Event not created",
        eventErrorCodes.EVENT_NOT_CREATED
      );
    await newEvent.save();
    return newEvent;
  } catch (e) {
    throw new ServiceError(e.message, e.code || eventErrorCodes.EVENT_ERROR);
  }
};

export const getEvents = async () => {
  try {
    const events = (await Event.find()) || [];
    return events;
  } catch (e) {
    throw new ServiceError(e.message, e.code || eventErrorCodes.EVENT_ERROR);
  }
};

export const getEventById = async (EventId) => {
  try {
    const event = await Event.findById(EventId);
    if (!event)
      throw new ServiceError(
        "Event not found",
        eventErrorCodes.EVENT_NOT_FOUND
      );
    return event;
  } catch (e) {
    throw new ServiceError(e.message, e.code || eventErrorCodes.EVENT_ERROR);
  }
};

export const deleteEvent = async (EventId) => {
  try {
    const event = await Event.findByIdAndDelete(EventId);
    if (!event)
      throw new ServiceError(
        "Event not found",
        eventErrorCodes.EVENT_NOT_FOUND
      );
    return event;
  } catch (e) {
    throw new ServiceError(e.message, e.code || eventErrorCodes.EVENT_ERROR);
  }
};

export const updateEvent = async (
  eventId,
  name,
  description,
  quotas,
  location,
  date
) => {
  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      { name, description, quotas, location, date },
      { new: true }
    );
    if (!event)
      throw new ServiceError(
        "Event not found",
        eventErrorCodes.EVENT_NOT_FOUND
      );
    return event;
  } catch (e) {
    throw new ServiceError(e.message, e.code || eventErrorCodes.EVENT_ERROR);
  }
};
