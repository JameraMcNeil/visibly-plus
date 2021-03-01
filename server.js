// DEPENDENCIES//

const express = require('express');

// CONFIGURATION //

const app = express();
const port = 3000;

// ROUTES //

app.get('/', (req,res) => {
    res.send('This is a test.')
})


app.listen(port, () => {
    console.log('Listening in port: ' + port)
});