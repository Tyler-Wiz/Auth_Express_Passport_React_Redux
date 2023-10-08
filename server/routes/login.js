const express = require("express");
const passport = require("passport");

// call express
const router = express.Router();

router.post("/", passport.authenticate("Local-Strategy"), (req, res) => {
  res.send(req.user);
});

module.exports = router;
