// DEPENDENCIES//

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// CONFIGURATION //

const app = express();
// Allow use of Heroku's port or your own local port, dependong on the environment
const PORT = process.env.PORT || 3000;
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/visibly-plus', { useNewUrlParser: true}, {useUnifiedTopology: true}
);
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

// MIDDLEWARE //

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// MODELS //

const Shop = require('./models/shops');

// ROUTES //

app.get('/seed', (req, res) => {
    Shop.create([
    {
        name:'Girlfriend Collective',
        description:'Sustainable, ethically made activewear in sizes XXS - 6XL',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1mN3LFxLbv0q2rZGS2ziWijQTCozNHGlMUg&usqp=CAU',
        isBlackOwned: false,
        isSustainable: true,
        isSmallBusiness: false,
        location: 'Based in Seattle, Washington'
    },
    {
        name:'WrayNYC',
        description:'Fine art inspired clothing. Sizes XS-5X.',
        img: './img/wraynyc.jpg',
        isBlackOwned: false,
        isSustainable: true,
        isSmallBusiness: true,
        location: 'Based in NYC'
    },
    {
        name:'Henning',
        description:'Luxury womenswear in sizes 12 to 24.',
        img: './img/henning.jpg',
        isBlackOwned: false,
        isSustainable: true,
        isSmallBusiness: true,
        location: 'Based in NYC'
    },
    {
        name:'Beaton Linen',
        description:'A slow fashion brand. Sizes XS-4X.',
        img: './img/beatonlinen.jpg',
        isBlackOwned: false,
        isSustainable: true,
        isSmallBusiness: true,
        location: 'Based in Vancouver'
    },
    {
        name:'Alder Apparel',
        description:'Ethically-made, sustainable, outdoor apparel in sizes X6-6X.',
        img: './img/alderapparel.jpg',
        isBlackOwned: false,
        isSustainable: true,
        isSmallBusiness: true,
        location: 'Based in Toronto, Canada'
    },
    {
        name:'Nettle Studios',
        description:'Size inclusive, slow fashion, small batch.',
        img: './img/nettlestudios.jpg',
        isBlackOwned: false,
        isSustainable: true,
        isSmallBusiness: true,
        location: 'Based in San Francisco'
    }
], (error, data) => {
    res.redirect('/shops')
    })
})

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


app.listen(PORT, () => {
    console.log('Listening in port: ' + PORT)
});