const express = require("express");
const {
  register,
  activateAccount,
  login,
  auth,
  sendverification,
  findUser,
  sendRestPasswordCode,
  validateResetCode,
  changePassword,
} = require("../controllers/user");
1;
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.post("/sendVerification", authUser, sendverification);
router.post("/findUser", findUser);
router.post("/sendResetPasswordCode", sendRestPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);

module.exports = router;
