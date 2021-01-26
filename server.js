require('dotenv').config();
const express = require("express");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 8001;
const passport = require("passport");
const compression = require("compression");


const db = require("./models");

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes")(app);



if (process.env.NODE_ENV === "production") {
    const root = require("path").join(__dirname, "client", "build");
    app.use(express.static(root));
    app.get("*", (req, res) => {
      res.sendFile("index.html", { root });
    });
  }

db.sequelize.sync({ force: false}).then(() => {

    app.listen(PORT, () => {
        console.log(`Server is live on http://localhost:${PORT} !`)
    });
});