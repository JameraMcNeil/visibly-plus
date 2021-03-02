const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    img: String,
    isBlackOwned: Boolean,
    isSustainable: Boolean,
    isSmallBusiness: Boolean,
    location: String
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;