const express = require('express')
const AllProduct = require('../model/ProductModel/productmodel')

const productsRoute = express.Router();

productsRoute.get('/',async(req,res)=>{
try{
 const data = await AllProduct.find();
 return res.status(200).send({
    status: true, 
    data: data, 
    message: "Got all products successfully"
});
}catch(e){
    console.log(e)
    return res.status(500).send({
        status: false, 
        message: "An error occurred while fetching products"
    });
}
})

productsRoute.post('/add',async(req,res)=>{
    const {
        title,
        price,
        description,
        category,
        plp,
        brand_namez,
        discountedPriceText,
        actualPriceText,
        discount_price_box,
        image,
        rating
    } = req.body;
    try{
     const dataAdd = new AllProduct({
        title,
        price,
        description,
        category,
        plp,
        brand_namez,
        discountedPriceText,
        actualPriceText,
        discount_price_box,
        image,
        rating
     });
     await dataAdd.save()
     return res.status(200).send({
        status: true, 
        data: data, 
        message: "Add products successfully"
    });
    }catch(e){
        console.log(e)
        return res.status(500).send({
            status: false, 
            message: "An error occurred while adding products"
        });
    }
    })

module.exports = productsRoute;
