const Github = require("../models/githubModel");
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
require("dotenv").config();

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_SECRET;

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Github.findOne({ _id: id });
    if (!user) done(null, false);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:4000/auth/github/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const githubUser = await Github.findOne({ githubId: profile.id });
        console.log(githubUser);
        if (githubUser) {
          return done(null, githubUser);
        } else {
          const user = await Github.create({
            githubId: profile.id,
          });
          return done(null, user);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
