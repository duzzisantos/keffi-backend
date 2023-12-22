require("dotenv").config();
process.env.NODE_ENV = "production";
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const compression = require("compression");
const RateLimit = require("express-rate-limit");

const db = require("../models");
const { jwtDecode } = require("jwt-decode");

db.mongoose
  .connect(process.env.MONGO_URI || db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    if (err) {
      console.log("Database could not connect. Check settings and try again!");
      process.exit();
    }
  });

var corsOptions = {
  origin: "http://localhost:8080" ?? process.env.CLIENT_HOSTNAME,
};

const limiter = RateLimit({
  windowMs: 1 * 60 * 100,
  max: 20,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(limiter);

//Security parameters
app.use(helmet());
app.use(
  mongoSanitize({
    replaceWith: "-",
  })
);

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "http://localhost:3000/"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
      upgradeInsecureRequests: [],
      objectSrc: ["'none'"],
    },
  })
);

app.use(helmet.crossOriginEmbedderPolicy());
app.use(
  helmet.referrerPolicy({
    options: "no referrer",
  })
);
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

// //prefer https connections

app.use(
  helmet.hsts({
    maxAge: 15552000,
    preload: true,
    includeSubDomains: false,
  })
);

//REST routes
require("../routes/appraisal")(app);
require("../routes/register")(app);
require("../routes/recommendations.routes")(app);

//MiddleWare for checking authorized users
app.use((req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  const decodedToken = jwtDecode(token);

  if (decodedToken.aud === process.env.AUTHORIZATION_AUD) {
    req.decodedToken = decodedToken;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized Access" });
  }
});

//Connection
const PORT = process.env.PORT;
const webHostName = process.env.CLIENT_HOSTNAME;
app.listen(PORT, (err) => {
  console.log("Listening to port", PORT ?? webHostName);
  if (err) {
    console.log(err);
  }
});
