const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const userschema = mongoose.Schema(
  {
    first_name: {
      type: "string",
      required: [true, "first name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: "string",
      required: [true, "last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: "string",
      required: [true, "user name is required"],
      trim: true,
      text: true,
      unique: true,
    },

    email: {
      type: "string",
      required: [true, "email is required"],
      trim: true,
    },
    password: {
      type: "string",
      required: [true, "password is required"],
    },
    picture: {
      type: "string",
      default:
        "https://res.cloudinary.com/facebook-clone-web/image/upload/v1659693096/default_pic_jeaybr_i0drjq.png",
    },
    cover: {
      type: "string",
      trim: true,
      default: "",
    },
    gender: {
      type: "string",
      required: [true, " Gender is required"],
      trim: true,
      enum: ["male", "female", "other"],
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    requests: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highschool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      realtionship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userschema);
