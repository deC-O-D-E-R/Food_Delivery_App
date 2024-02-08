const express = require("express");
const app = express()
const port = 5000;
const mongoDB = require('./db')
mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.use(express)
app.use('/api', require("./Routes/CreateUser"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})