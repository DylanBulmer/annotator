import { Schema, models, model } from "mongoose";

/* UserSchema will correspond to a collection in your MongoDB database. */
const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your organization's name."],
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organizaion",
      reqired: [true, "Organization Id is required."],
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      reqired: [true, "Are you signed in?"],
    },
    guidelines: {
      type: String,
    },
    datasets: {
      type: Array,
    },
  },
  { timestamps: true }
);

// exports User model.
export default models.Project || model("Project", ProjectSchema);
