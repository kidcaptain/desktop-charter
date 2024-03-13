const Passager = require("../models/passager");
const { QueryTypes } = require("sequelize");
const sequelize = require("../db/db");
exports.findAll = async (req, res) => {
  //   const nom = req.query.nom;
  //   var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
  // const currISODate = new Date().toISOString();
  //   Passager.query("SELECT * FROM Passager ").then((data) => {
  //     res.send(data);
  //   }).catch(err => {
  //     res.status(500).send({message: err.message || 'Some error occured while retrieving tutorials.'})
  //   });
    sequelize
    .query("SELECT * FROM `Passager`", { type: QueryTypes.SELECT })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occured while retrieving tutorials.",
        });
    });
};
