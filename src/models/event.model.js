import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quotas: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    spaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Space",
      },
    ],
    undertaking: [
      {
        type: Schema.Types.ObjectId,
        ref: "Undertaking",
      },
    ],
  },
  { timestamps: true }
);

const Event = model("Event", eventSchema);
export default Event;
