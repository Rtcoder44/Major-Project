const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");


router.route ("/signup")
.get( userController.renderSignUpForm)
.post( wrapasync(userController.signUp));

router.route ("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}),
userController.login);



router.get("/logout",userController.logOut);

module.exports = router;