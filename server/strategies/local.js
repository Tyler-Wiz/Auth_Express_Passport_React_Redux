const User = require("../models/user");
const { Strategy } = require("passport-local");
const { comparePasswords } = require("../utils/bcrypt");
const passport = require("passport");
require("dotenv").config();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) done(null, false);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  "Local-Strategy",
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        // if (!email || !password) done(new Error("Non"), null);
        const user = await User.findOne({ email });
        if (!user) return done(null, false);
        const isValid = await comparePasswords(password, user.password);
        if (isValid) {
          console.log("Auth Successful");
          done(null, user);
        } else {
          done(null, null);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
