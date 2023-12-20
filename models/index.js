const dbConfig = require("./config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.register = require("../models/register");
db.appraisal = require("../models/appraisal");
db.recommendation = require("../models/recommendations");

module.exports = db;
