const express=require('express');
const authRoute=require('../routes/AuthRoutes');
const intitutionRoute = require('../routes/InstitutionRoutes')
const formRoute = require('../routes/FormRoutes');
const certificateUploadRoute = require('../routes/CertificateUploadRoutes');

const connect = require('./connect');
const cors=require('cors');
require('dotenv').config();
const app=express();





app.use(express.json(),cors());
app.use(authRoute,intitutionRoute,formRoute)
app.use( certificateUploadRoute);

app.listen(process.env.PORT,function(){
    connect();
    console.log(`Server started on port ${process.env.PORT}`);
})