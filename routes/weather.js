const express = require("express");
const router = express.Router();

const weatherController = require("../controllers/weather");

router.get("/get", weatherController.getWeatherByMount);

router.get("/input/:city", weatherController.getWeatherByInput);

module.exports = router;
