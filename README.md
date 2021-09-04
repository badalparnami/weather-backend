# Weather App Backend

A web app that shows weather information.

View Demo [here](https://agitated-heisenberg-b8c50b.netlify.app/).

**To view the frontend code. Visit [here](https://github.com/badalparnami/weather-app).**

## Usage

Create a free [OpenWeather](https://openweathermap.org/api) and [IpApi](https://members.ip-api.com/) accounts.

1. Fork the repo and then Clone/Download it.
2. `cd weather-backend`
3. Create `nodemon.json` file in the root directory.
4. Setup required environment variables.

```js
{
    "env": {
        "API_WEATHER": //OpenWeather Api Key,
        "ACCESS": "*",
        "API_IP": //IpApi Key
    }
}
```

5. Change ACCESS property (if require)
6. Run `npm install`
7. Run `npm run server` to start the local server at port 8080.

## Structure

```bash
.
├── app.js
├── http-error.js
├── controllers
│   ├── weather.js
├── routes
│   ├── weather.js
```

## API ENDPOINTS

| Endpoint                  | Method | Description                               |
| ------------------------- | ------ | ----------------------------------------- |
| /api/weather/get          | GET    | Provide weather information based on ip   |
| /api/weather/input/{city} | GET    | Provide weather information based on city |

## Build with

- Express
- Node-Fetch
- Nodemon (dev dependency)
