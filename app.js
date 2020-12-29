const express = require("express");
const weatherRoutes = require("./routes/weather");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ACCESS);
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api/weather", weatherRoutes);

app.use((error, req, res, next) => {
  res.status(error.code || error.status_code || 500);
  res.json({ message: error.message || "Something went wrong #c" });
});

app.listen(PORT);
