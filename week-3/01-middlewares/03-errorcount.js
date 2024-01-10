
const express = require('express');


const app = express();
const zod = require("zod")
let errorCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

const schema = zod.string()
app.use(express.json())


app.get('/user', function(req, res) {
  throw new Error("User not found");
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  const username = req.body.username
  const response = schema.safeParse(username)
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});

app.use((err,req,res,next)=>{
  res.status(404).send("something is up with the server")
  errorCount++
  console.log(errorCount);
})

module.exports = app;