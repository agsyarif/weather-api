import express from "express"
import weatherRouter from "./routes/weather.router.js";

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world')
})


app.use('/api/weather', weatherRouter);

app.listen(3000, () => {
  console.log('app running in port 3000');
})