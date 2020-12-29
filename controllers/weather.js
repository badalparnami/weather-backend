const fetch = require("node-fetch");
const HttpError = require("../http-error");

const weather = async (city, next) => {
  try {
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_WEATHER}&units=metric`
    ).then((response) => response.json());
    return weatherData;
  } catch (err) {
    const error = new HttpError("Unusual Error Occurred!", 500);
    return next(error);
  }
};

const parseIp = (req) =>
  (typeof req.headers["x-forwarded-for"] === "string" &&
    req.headers["x-forwarded-for"].split(",").shift()) ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;

exports.getWeatherByMount = async (req, res, next) => {
  const ip = parseIp(req);
  let dataByIP;
  try {
    dataByIP = await fetch(
      `http://ip-api.com/json/${ip}?fields=66842623&key=${process.env.API_IP}`
    ).then((response) => response.json());
  } catch (err) {
    const error = new HttpError("Something went wrong #a", 400);
    return next(error);
  }

  if (dataByIP.status !== "success") {
    const error = new HttpError("Something went wrong #b", 400);
    return next(error);
  }

  const data = {
    city: dataByIP.city,
    regionName: dataByIP.regionName,
    zip: dataByIP.zip,
  };

  const weatherData = await weather(data.city, next);

  if (weatherData.cod === 401) {
    const error = new HttpError("Error #9/13/22/1/12/94", 400);
    return next(error);
  }

  if (weatherData.cod !== 200) {
    const error = new HttpError(weatherData.message, 404);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched successfully",
    weather: weatherData,
    ip: data,
  });
};

exports.getWeatherByInput = async (req, res, next) => {
  const city = req.params.city;
  const weatherData = await weather(city, next);

  if (weatherData.cod === 401) {
    const error = new HttpError("Error #9/13/22/1/12/94", 400);
    return next(error);
  }

  if (weatherData.cod !== 200) {
    const error = new HttpError(weatherData.message, 404);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched successfully",
    weather: weatherData,
  });
};
