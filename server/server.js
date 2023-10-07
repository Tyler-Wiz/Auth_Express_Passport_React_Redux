const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookie = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalPassport = require("passport").Strategy;
const register = require("./routes/register");
// ----------------------- END IMPORTS ---------------------

// invoke express
const app = express();

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
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 7869786187, secure: true, sameSite: false },
  })
);
app.use(cookie("secretcode"));

// PORT
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});

// ROUTES
app.use("/register", register);
