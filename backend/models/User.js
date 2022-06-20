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
      default: "",
    },
    cover: {
      type: "string",
      default: "",
      trim: true,
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
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: {
      user: {
        type: ObjectId,
        ref: "User",
      },
    },
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
    savedPost: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userschema);
