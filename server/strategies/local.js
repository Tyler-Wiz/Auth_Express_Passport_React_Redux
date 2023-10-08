const User = require("../models/user");
const { Strategy } = require("passport-local");
const { comparePasswords } = require("../utils/bcrypt");
const passport = require("passport");

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
  new Strategy(async (username, password, done) => {
    try {
      if (!username || !password) done(new Error("Bad Request"), null);
      const user = await User.findOne({ username });
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
  })
);
