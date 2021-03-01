// DEPENDENCIES//

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// CONFIGURATION //

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

// Allow use of Heroku's port or your own local port, dependong on the environment
const port = 3000;

// ROUTES //

app.get('/', (req,res) => {
    res.send('This is a test.')
});

// index //

app.get('/shops', (req, res) => {
    res.send('This is where the shops will be')
});

// new //

app.get('/shops/new', (req, res) => {
    res.send('Add a new shop here')
});

// create //

app.post('/shops/', (req,res) => {
    console.log('The information from the new route will be posted using this route')
});

// show //

app.get('/shops/:id', (req,res) => {
    res.send('View a specific shop page here')
});

// delete //

app.delete('/shops/:id', (req, res) => {
    console.log('This route deletes any app')
});

// edit //

app.get('/shops/:id/:edit', (req,res) => {
    res.send('This is where the edit page goes')
});

// update //

app.put('/shops/:id', (req, res) => {
    console.log('This applies any changes to existing shop listings')
})


app.listen(port, () => {
    console.log('Listening in port: ' + port)
});