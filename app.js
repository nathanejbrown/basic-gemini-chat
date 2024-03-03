const express = require('express'); 
const dotenv = require('dotenv');
dotenv.config();
  
const app = express(); 
const PORT = 3000; 

const indexRouter = require('./routes/index');
const cors = require('cors');

let corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
  
app.use(express.json())
app.use('/', indexRouter)
app.listen(PORT, (error) => { 
  if(!error) {
    console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
  }
  else {
    console.log("Error occurred, server can't start", error); 
  }
}); 

module.exports = app;