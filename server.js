const express = require('express');

const app=express();
app.use(express.json());

const getLocationRouter=require('./getLocation');
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/getLocation',getLocationRouter);

app.listen(5000,()=>console.log('lsitening on 5000...'));
  
