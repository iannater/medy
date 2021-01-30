// Requiring our models and passport as we've configured it
const { sequelize } = require("../models");
const db = require("../models");
var isAuthenticated = require('../config/middleware/isAuthenticated')

module.exports = function (app) {
  app.post("/api/createmed/:id", function (req, res) {
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

  app.get("/api/getMed", (req, res) => {
    console.log("req.user", req.user)
    console.log("User ID", req.user.id)

    //, include: [{model: db.Medicine}]
    db.User.findOne({ where: { id: req.user.id }, include: [{ all: true, nested: true }] }).then(result => {
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", result)
      res.json({ result })
    })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });



};






