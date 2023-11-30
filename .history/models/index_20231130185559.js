import { url } from "./config";
import mongoose, { Promise } from "mongoose";
Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.register = require("../models/register");
db.appraisal = require("../models/appraisal");

export default db;
