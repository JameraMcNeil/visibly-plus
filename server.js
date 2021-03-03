// DEPENDENCIES//

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config()

// CONFIGURATION //

const app = express();
// Allow use of Heroku's port or your own local port, dependong on the environment
const PORT = process.env.PORT || 3000;

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

// MODELS //

const Shop = require('./models/shops');

// ROUTES //

app.get('/seed', (req, res) => {
    Shop.create([
    {
        name:'Girlfriend Collective',
        description:'Sustainable, ethically made activewear in sizes XXS - 6XL',
        img: './img/girlfriend.jpg',
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
    res.redirect('/shops');
    });
});

// index //

app.get('/shops', (req, res) => {
    Shop.find({}, (error, shops) => {
        res.render('index.ejs', {
            allShops : shops
        });
    });
});

// new //

app.get('/shops/new', (req, res) => {
    res.render('new.ejs');
});

// create //

app.post('/shops/', (req,res) => {
    if(req.body.isBlackOwned === 'on') {
        req.body.isBlackOwned = true;
    } else {
        req.body.isBlackowned =false;
    };
    if(req.body.isSustainable === 'on') {
        req.body.isSustainable = true;
    } else {
        req.body.isSustainable = false;
    };
    if(req.body.isSmallBusiness === 'on') {
        req.body.isSmallBusiness = true;
    } else {
        req.body.isSmallBusiness = false; 
    };

    console.log(req.body);

    Shop.create(req.body, (error, createdShop) => {
        res.redirect('/shops')
    });
});

// show //

app.get('/shops/:id', (req,res) => {
    Shop.findById(req.params.id, (error, foundShop) => {
        res.render('show.ejs', {
            shop: foundShop
        });
    });
});

// delete //

app.delete('/shops/:id', (req, res) => {
    Shop.findByIdAndRemove(req.params.id, (error, deletedShop) => {
        console.log('Deleting record: ' + req.params.id);
        console.log(deletedShop)
    });
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