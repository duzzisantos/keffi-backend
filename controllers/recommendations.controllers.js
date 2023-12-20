const Recommender = require("../models/recommendations");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(404).json({ message: "Request body not found" });
  }

  const {
    qualityOfWork,
    quantityOfWork,
    delivery,
    responsibility,
    punctuality,
  } = req.body;

  const recommender = new Recommender({
    //Quality metrics
    highQualityTraining: qualityOfWork.highQuality.training,
    highQualityBehaviour: qualityOfWork.highQuality.behavioural,
    averageQualityTraining: qualityOfWork.averageQuality.training,
    averageQualityBehaviour: qualityOfWork.averageQuality.behavioural,
    lowQualityTraining: qualityOfWork.lowQuality.training,
    lowQualityBehavioural: qualityOfWork.lowQuality.behavioural,

    //Quantity metrics
    highQuantityTraining: quantityOfWork.highQuantity.training,
    highQuantityBehaviour: quantityOfWork.highQuantity.behavioural,
    averageQuantityTraining: quantityOfWork.averageQuantity.training,
    averageQuantityBehaviour: quantityOfWork.averageQuantity.behavioural,
    lowQuantityTraining: quantityOfWork.lowQuantity.training,
    lowQuantityBehavioural: quantityOfWork.lowQuantity.behavioural,

    //Delivery metrics
    highDeliveryTraining: delivery.highDelivery.training,
    highDeliveryBehaviour: delivery.highDelivery.behavioural,
    averageDeliveryTraining: delivery.averageDelivery.training,
    averageDeliveryBehaviour: delivery.averageDelivery.behavioural,
    lowDeliveryTraining: delivery.lowDelivery.training,
    lowDeliveryBehavioural: delivery.lowDelivery.behavioural,

    //Responsibility metrics
    highResponsibilityTraining: responsibility.highResponsibility.training,
    highResponsibilityBehaviour: responsibility.highResponsibility.behavioural,
    averageResponsibilityTraining:
      responsibility.averageResponsibility.training,
    averageResponsibiltyBehaviour:
      responsibility.averageResponsibility.behavioural,
    lowResponsibilityTraining: responsibility.lowResponsibility.training,
    lowResponsibilityBehavioural: responsibility.lowResponsibility.behavioural,

    //Punctuality metrics
    highPunctualityTraining: punctuality.highPunctuality.training,
    highPunctualityBehaviour: punctuality.highPunctuality.behavioural,
    averagePunctualityTraining: punctuality.averagePunctuality.training,
    averagePunctualityBehaviour: punctuality.averagePunctuality.behavioural,
    lowPunctualityTraining: punctuality.lowPunctuality.training,
    lowPunctualityBehavioural: punctuality.lowPunctuality.behavioural,
  });

  recommender
    .save(recommender)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err.message));
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
