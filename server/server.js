const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookie = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");

const MongoStore = require("connect-mongo");
require("dotenv").config();
require("./strategies/local");
require("./strategies/github");

// ------------------ ROUTE IMPORTS -----------------

const register = require("./routes/register");
const login = require("./routes/login");
const github = require("./routes/github");

// ----------------------- END IMPORTS ---------------------

// invoke express
const app = express();

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo DB connect successful"))
  .catch((error) => console.log("Mongo DB connect successful", error));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET_CODE,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: "lax", sameSite: "none" },
    store: MongoStore.create({
      mongoUrl: uri,
    }),
  })
);
app.use(cookie(process.env.SECRET_CODE));
app.use(passport.initialize());
app.use(passport.session());

// PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});

// ROUTES
app.use("/register", register);
app.use("/login", login);
app.use("/auth", github);
