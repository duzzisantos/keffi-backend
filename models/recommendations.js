const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Ensure that the form data in the frontend matches this data structure
//This schema is data model for creating and maintaining appraisal recommendation systems
const Recommendation = new Schema(
  {
    qualityOfWork: {
      highQuality: {
        training: { type: String },
        behavioural: { type: String },
      },
      averageQuality: {
        training: { type: String },
        behavioural: { type: String },
      },
      lowQuality: {
        training: { type: String },
        behavioural: { type: String },
      },
    },
    quantityOfWork: {
      highQuantity: {
        training: { type: String },
        behavioural: { type: String },
      },
      averageQuantity: {
        training: { type: String },
        behavioural: { type: String },
      },
      lowQuantity: {
        training: { type: String },
        behavioural: { type: String },
      },
    },
    delivery: {
      highDelivery: {
        training: { type: String },
        behavioural: { type: String },
      },
      averageDelivery: {
        training: { type: String },
        behavioural: { type: String },
      },
      lowDelivery: {
        training: { type: String },
        behavioural: { type: String },
      },
    },
    responsibility: {
      highResponsibility: {
        training: { type: String },
        behavioural: { type: String },
      },
      averageResponsibility: {
        training: { type: String },
        behavioural: { type: String },
      },
      lowResponsibility: {
        training: { type: String },
        behavioural: { type: String },
      },
    },
    punctuality: {
      highPunctuality: {
        training: { type: String },
        behavioural: { type: String },
      },
      averagePunctuality: {
        training: { type: String },
        behavioural: { type: String },
      },
      lowPunctuality: {
        training: { type: String },
        behavioural: { type: String },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("recommendation", Recommendation);
