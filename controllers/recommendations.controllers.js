const Recommender = require("../models/recommendations");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(404).json({ message: "Request body not found" });
  }

  //Form data from react matches data model structure - therefore calling
  //req.body as argument for the new Recommender instance suffices.
  const recommender = new Recommender(req.body);
  recommender
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error("Error saving recommendation:", error);
    });
};

//GET ALL
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};
  Recommender.find(condition)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

//GET ONE
exports.findOne = (req, res, next) => {
  const id = req.params._id;
  Recommender.findById(id)
    .then((data) => {
      res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//UPDATE

exports.update = (req, res) => {
  const id = req.params._id;
  Recommender.findByIdAndUpdate(id, { $set: req.body }, (err, data, next) => {
    if (err) {
      res.status(500).json({
        message: "Error in updating employee information!",
      });
      return next(err);
    } else {
      res.status(200).json({
        message: "Updated employee information successfully!",
        data: data,
      });
    }
  });
};

//DELETE ONE

exports.deleteOne = (req, res) => {
  const id = req.params.id;
  Recommender.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(403).json({
          message: "Forbidden request",
        });
      } else {
        res.status(200).json({
          message: "Deleted employee information successfully!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//DELETE ALL

exports.deleteAll = (req, res) => {
  Recommender.deleteMany({})
    .then((data) => {
      res.status(200).json("Deleted all employee information!");
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error occurred in deleting all employees",
      });
      console.log(err);
    });
};
