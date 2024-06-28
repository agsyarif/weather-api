import express from "express"
// import weatherRoute from "./routes/weather.router";
import weatherRouter from "./routes/weather.router.js";
import { createClient } from "redis";

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world')
})


app.use('/api/weather', weatherRouter);

app.listen(3000, () => {
  console.log('app running in port 3000');
})