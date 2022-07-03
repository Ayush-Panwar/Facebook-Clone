const express = require("express");
const {
  register,
  activateAccount,
  login,
  auth,
  sendverification,
  findUser,
} = require("../controllers/user");
1;
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.post("/sendVerification", authUser, sendverification);
router.post("/findUser", findUser);

module.exports = router;
