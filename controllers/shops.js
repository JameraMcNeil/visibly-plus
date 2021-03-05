const express = require('express');
const router = express.Router();
const Shop = require('../models/shops.js')


// ROUTES //

router.get('/seed', (req, res) => {
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

router.get('/', (req, res) => {
    console.log('In index route')
    Shop.find({}, (error, shops) => {
        res.render('index.ejs', {
            allShops : shops
        });
    });
});

// new //

router.get('/new', (req, res) => {
    console.log('In new route')
    res.render('new.ejs');
});

// create //

router.post('/', (req,res) => {
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
    console.log('In create route')

    Shop.create(req.body, (error, createdShop) => {
        res.redirect('/shops')
    });
});

// show //

router.get('/:id', (req,res) => {
    Shop.findById(req.params.id, (error, foundShop) => {
        console.log(foundShop)
        console.log('In show route')
        res.render('show.ejs', {
            shop: foundShop
        });
    });
});

// delete //

router.delete('/:id', (req, res) => {
    console.log('In delete route')
    Shop.findByIdAndRemove(req.params.id, (error, deletedShop) => {
        console.log('Deleting record: ' + req.params.id);
        console.log(deletedShop)
    });
});

// edit //

router.get('/:id/edit', (req,res) => {
    Shop.findById(req.params.id, (error, foundShop) => {
        console.log(foundShop)
        console.log(req.params.id)
        console.log('In edit route')
        res.render('edit.ejs', {
            shop: foundShop
        });
    });
});

// update //

router.put('/:id', (req, res) => {
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
    // param 1 = id of shop we are going to update
    // param 2 - the contents of the update going to the database
    // param 3 = make sure mongoose send us back the changed record
    // param 4 = the callback to execute after the database is updated
    console.log('We are in the put route')
    Shop.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) =>{
        res.redirect('/shops')
    })
})


module.exports = router;