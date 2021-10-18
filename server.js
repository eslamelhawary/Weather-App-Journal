// Setup empty JS object to act as endpoint for all routes
let projectData = {}
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');  
app.use(express.static('weather'));




/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/weather_object', (req, res) => {
    res.send(projectData)
})

app.post('/recieveData', (req, res) => {
    // const { temp, feelings, date } = req.body;
    
    // projectData.push(temp, feelings, date);
    projectData = { ...req.body }
    res.end()
})

app.listen(port, () => {
    console.log(`I am running on:http://localhost:${port}`)
});

