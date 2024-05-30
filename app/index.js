require("dotenv").config();
process.env.NODE_ENV = "production";
const express = require("express");
const app = express();
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

const RateLimit = require("express-rate-limit");

const db = require("../models");
const { jwtDecode } = require("jwt-decode");

db.mongoose
  .connect(process.env.MONGO_URI || db.url)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    if (err) {
      console.log("Database could not connect. Check settings and try again!");
      process.exit();
    }
  });

//expanded cor options
var corsOptions = {
  origin: "http://localhost:3000" ?? process.env.CLIENT_HOSTNAME,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"], // Add required headers
  credentials: true, // If you need to include cookies in CORS requests
};

const limiter = RateLimit({
  windowMs: 1 * 60 * 100,
  max: 20,
});

app.use(cors(corsOptions));
app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true, limit: "200kb" }));

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
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", (err) => {
  console.log("Listening to port", PORT);
  if (err) {
    console.log(err);
  }
});
