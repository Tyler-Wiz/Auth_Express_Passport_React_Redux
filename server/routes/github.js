const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/github", passport.authenticate("github"), (req, res) => {});

router.get("/github/redirect", passport.authenticate("github"), (req, res) => {
  res.send(200);
});

module.exports = router;
