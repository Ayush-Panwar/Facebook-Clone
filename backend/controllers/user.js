const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendverificationEmail, sendResetCode } = require("../helpers/mailer");
const { findByIdAndUpdate } = require("../models/User");
const generateCode = require("../helpers/generateCode");
const Code = require("../models/Code");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "The email address already exists,try with a different email address",
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must be between 3 and 3 characters",
      });
    }

    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "last name must be between 3 and 3 characters",
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be 6 characters.",
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);
    // return;
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailverificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailverificationToken}`;
    sendverificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success! Please activate your email to start ",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (validUser != user.id) {
      return res.status(400).json({
        message: "You dont have authorization to complete this operation.",
      });
    }
    if (check.verified == true) {
      return res.status(400).json({
        message: "This email is already activated.",
      });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });

      return res
        .status(200)
        .json({ message: "Account has been activated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "the email address you entered is not connected to an account",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credential.Please try again.",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success! Please activate your email to start ",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.auth = (req, res) => {
  console.log(req.user);
  res.json("welcome from auth");
};
exports.sendverification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified == true) {
      return res
        .status(400)
        .json({ message: "This account is already activated." });
    }
    const emailverificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailverificationToken}`;
    sendverificationEmail(user.email, user.first_name, url);
    return res.status(200).json({
      message: "Email verification link has been sent to your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(400).json({ message: "Account does not exits." });
    }
    return res.status(200).json({
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendRestPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(5);
    const savedcode = await new Code({
      code,
      user: user._id,
    }).save();
    sendResetCode(user.email, user.first_name, code);
    return res.status(200).json({
      message: "Email reset has been send to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const Dbcode = await Code.findOne({ user: user._id });
    if (Dbcode.code !== code) {
      return res.status(400).json({ message: "Verification Code is wrong" });
    }
    return res.status(200).json({ message: "ok" });
  } catch (error) {}
};
exports.changePassword = async (req, res) => {
  const { email, password } = req.body;
  const cryptedPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate({ email }, { password: cryptedPassword });
  return res.status(200).json({ message: "ok" });
};
exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await User.findOne({ username }).select("-password");
    if (!profile) {
      return res.json({ ok: false });
    }
    const posts = await Post.find({ user: profile._id })
      .populate("user")
      .sort({ createdAt: "desc" });

    res.json({ ...profile.toObject(), posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, { picture: url });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateCover = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, { cover: url });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateDetails = async (req, res) => {
  try {
    const { infos } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { details: infos },
      { new: true }
    );
    res.json(updated.details);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
exports.addFriend = async (req, res) => {
  try {
    if (req.user.id != req.params.id) {
      const sender = await User.finById(req.user.id);
      const receiver = await User.finById(req.params.id);
    } else {
      return res
        .status(400)
        .json({ message: "You can't send request to yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
