const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 32,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 32,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  role: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  meetups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meetup",
    },
  ],
  notifications: [
    {
      type: Schema.Types.ObjectId,
      status: String,
      ref: "Meetup",
    },
  ],
});

UserSchema.methods.toJSON = function () {
  const { password, __v, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
