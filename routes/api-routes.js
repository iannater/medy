// Requiring our models and passport as we've configured it
const { sequelize } = require("../models");
const db = require("../models");
//const offer = require("../models/offer");
var passport = require("../config/passport");
var isAuthenticated = require('../config/middleware/isAuthenticated')

module.exports = function (app) {

  app.post("/api/user_signup", function (req, res) {

    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
    })
      .then(function () {
        // res.redirect(307, "/api/login");
        res.sendStatus(201)
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
 
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    console.log("Userssss",req.user)
    res.json(
      req.user
    );
  });
 
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    console.log(req.user);
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.User.findOne({ where: { email: req.user.email } }).then(result => {
        console.log("This is the user result", result);
        res.json({ result })
      }).catch(err => {
        console.log("Get user wasn't completed");
        res.status(500).json(err);
      })
    }
  });

     // Route for logging user out
     app.get("/logout", (req, res) => {
      req.logout();
      res.redirect("/");
  });

  app.post("/api/createmed/:id", isAuthenticated, function (req, res) {
    db.Medicine.create({
      medicineName: req.body.medicineName,
      timeTaken: req.body.timeTaken,
      waitingPeriod: req.body.waitingPeriod,
      amountTaken: req.body.amountTaken,
      UserId: req.params.id
    })
      .then(function () {
        // res.redirect(307, "/api/login");
        res.sendStatus(201)
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/api/getMed", isAuthenticated, (req, res) => {
    console.log("req.user", req.user)
   
    db.User.findOne({ where: { id: req.user.id, include: [{all: true, nested: true}]}
      
      
    }).then(result =>  {
      console.log("ress", res)
      
        // res.redirect(307, "/api/login");
        res.json({result})
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

};






