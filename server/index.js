const express = require('express');
const db = require('../models');
const router = require('../routes/employee');


// import Routes
const r_employee = require('../routes/employee');
const r_colorcategory = require('../routes/colorcategory');
const r_timeoff = require('../routes/timeoffrequest');



const config = {
    port: 5555, // default port to listen on
    host: 'localhost' // default host to connect to
};

const app = express();
app.use(express.json());
// app.use('/api', router);

console.clear();
console.log('================================= [ Starting ] =================================');
console.log('Server started at http://%s:%d/', config.host, config.port);    


// ============== [ Routes ] ==============

app.use('/employee', r_employee);
app.use('/colorcategory', r_colorcategory);
app.use('/timeoff', r_timeoff)

// ============== [ Routes - End ] ========

app.get('/', (req, res) => {
    res.send({message: "Everything is working..."}).status(200);
    const query = req.query
    if(query.length > 0){console.log(query);};
});
app.get('/api', (req, res) => {
    res.json({message: 'Hello from server!'});
})

app.listen(config.port,config.host, async () =>{
    // sync the database here first
    // db.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
    // db.sequelize.sync({force: true}) alter: true
    db.sequelize.sync({alter: true});
    console.log('Server listening on port '+config.port);
    console.log('================================= [ Listening ] ================================');
});