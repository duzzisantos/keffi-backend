module.exports = (app) => {
  var router = require("express").Router();
  const {
    create,
    update,
    deleteOne,
    deleteAll,
    findAll,
    findOne,
  } = require("../controllers/recommendations.controllers");

  router.post("/", create);
  router.put("/:id", update);
  router.delete("/:id", deleteOne);
  router.delete("/", deleteAll);
  router.get("/", findAll);
  router.get("/:id", findOne);

  app.use("/api/recommendations", router);
};
