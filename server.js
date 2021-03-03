// DEPENDENCIES//

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config()

// CONFIGURATION //

const app = express();
// Allow use of Heroku's port or your own local port, dependong on the environment
const PORT = process.env.PORT || 3000;

// CONTROLLER LOGIC //
const shopsController = require('./controllers/shops.js');
app.use(shopsController);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/visibly-plus';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true}, {useUnifiedTopology: true}
);
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});


// MIDDLEWARE //

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));



app.listen(PORT, () => {
    console.log('Listening in port: ' + PORT)
});