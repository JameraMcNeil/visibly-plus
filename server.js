// DEPENDENCIES//

const express = require('express');

// CONFIGURATION //

const app = express();

// Allow use of Heroku's port or your own local port, dependong on the environment
const port = 3000;

// ROUTES //

app.get('/', (req,res) => {
    res.send('This is a test.')
})


app.listen(port, () => {
    console.log('Listening in port: ' + port)
});