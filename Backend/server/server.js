const express=require('express');
const authRoute=require('../routes/AuthRoutes');
const intitutionRoute = require('../routes/InstitutionRoutes')
const formRoute = require('../routes/FormRoutes');

const connect = require('./connect');
const cors=require('cors');
require('dotenv').config();
const app=express();
const certificateRoutes = require('../routes/CertificateRoutes');






app.use(express.json(),cors());
app.use(authRoute,intitutionRoute,formRoute)
app.use('/certificates', certificateRoutes);



app.listen(process.env.PORT,function(){
    connect();
    console.log(`Server started on port ${process.env.PORT}`);
})