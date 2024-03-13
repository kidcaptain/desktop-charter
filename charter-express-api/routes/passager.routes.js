module.exports = (app) => {
  const passagers = require("../controllers/passager.controller");

  var router = require("express").Router();

  router.get("/", passagers.findAll);

  router.get("/user/", )

  app.use("/api/passagers", router);
};

