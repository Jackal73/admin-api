import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AdminUserSchema = new Schema(
  {
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    fName: {
      type: String,
      required: true,
      maxlength: 30,
    },
    lName: {
      type: String,
      required: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
      indexes: 1,
    },
    isEmailConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    phone: {
      type: String,
      maxlength: 15,
    },
    password: {
      type: String,
      required: true,
      maxlength: 500,
    },
    role: {
      type: String,
      required: true,
      maxlength: 30,
      default: "developer", // admin, developer, customerService
    },
    refreshJWT: {
      addedAt: {
        type: Date,
        default: Date.now(),
      },
      token: {
        type: String,
        maxlength: 500,
      },
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Admin_user", AdminUserSchema);
