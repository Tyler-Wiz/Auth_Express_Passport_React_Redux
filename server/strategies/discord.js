const Discord = require("../models/discord");
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
require("dotenv").config();

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_SECRET;

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Discord.findOne({ _id: id });
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
        const discordUser = await Discord.findOne({ discordId: profile.id });
        console.log(discordUser);
        if (discordUser) {
          return done(null, discordUser);
        } else {
          const user = await Discord.create({
            discordId: profile.id,
          });
          return done(null, user);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
