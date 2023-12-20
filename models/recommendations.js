const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//This schema is data model for creating and maintaining appraisal recommendation systems
const Recommendation = new Schema(
  {
    qualityOfWork: {
      highQuality: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
      averageQuality: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
      lowQuality: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
    },
    quantityOfWork: {
      highQuantity: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
      averageQuantity: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
      lowQuantity: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
    },
    delivery: {
      highDelivery: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
      averageDelivery: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
      lowDelivery: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
    },
    responsibility: {
      highResponsibility: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
      averageResponsibility: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
      lowResponsibility: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
    },
    punctuality: {
      highPunctuality: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
      averagePunctuality: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
      lowPunctuality: {
        training: { type: String, unique: true },
        behavioural: { type: String, unique: true },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("recommendation", Recommendation);
