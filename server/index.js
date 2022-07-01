const express = require('express');

// Routes
const r_employee = require('../routes/employee');



const config = {
    port: 5555, // default port to listen on
    host: 'localhost' // default host to connect to
};

const app = express();
app.use(express.json());

console.log('================================= [ Starting ] =================================');
console.log('Server started at http://%s:%d/', config.host, config.port);    


// ============== [ Routes ] ==============

app.use(r_employee);

// ============== [ Routes - End ] ========

app.get('/', (req, res) => {
    res.send({message: "Everything is working..."}).status(200);
    const query = req.query
    if(query.length > 0){console.log(query);};
});
app.get('/api', (req, res) => {
    res.json({message: 'Hello from beaar server!'});
})

app.listen(config.port,config.host, () =>{
    console.log('Server listening on port '+config.port);
    console.log('================================= [ Listening ] ================================');
});