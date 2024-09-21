const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    description: { type: String, default: null }, 
    category: { type: String, required: true },
    plp: { type: String, default: null },
    brand_namez: { type: String, default: null }, 
    discountedPriceText: { type: String, default: null },
    actualPriceText: { type: Number, required: true },
    discount_price_box: { type: Number, default: null },
    image: { type: String, required: true },
    rating: {
        rate: { type: Number, default: null },
        count: { type: Number, default: null },
    },

},{versionKey:false})

const AllProduct = mongoose.model("products",ProductSchema)

module.exports = AllProduct;
      
