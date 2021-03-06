// Requiring our models and passport as we've configured it
const { sequelize } = require("../models");
const db = require("../models");

module.exports = function (app) {

  app.post("/api/createMedDeet/:id",  (req, res) => {
    db.MedDeet.create({
      timeTaken: req.body.timeTaken,
      amountTaken: req.body.amountTaken,
      MedicineId: req.body.id
    })
      .then(function () {
        // res.redirect(307, "/api/login");
        res.sendStatus(201)
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/api/getMed/:id",  (req, res) => {

   db.MedDeet.findAll({ where: { id: req.params.id}
      
    }).then(result =>  {
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", result)
      
        res.json({result})
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

};






