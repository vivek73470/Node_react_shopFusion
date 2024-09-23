const express = require('express');
const AllCart = require('../model/cartModel/cartmodel')

const cartRouter = express.Router();

// get all cart
cartRouter.get('/',async(req,res)=>{
    try {
        const data = await AllCart.find();
        return res.status(200).send({
            status: true,
            message: "Got all cart products successfully",
            data: data
        });
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            status: false,
            message: "An error occurred while fetching cart products"
        });
    }
})

// add all cart
cartRouter.post('/add',async(req,res)=>{
    const { title, price, description, category, plp, brand_namez, discountedPriceText, actualPriceText,
        discount_price_box, image} = req.body;
        try{
            const data = new AllCart({title, price, description, category, plp, brand_namez, discountedPriceText, actualPriceText, discount_price_box, image}) 
            await data.save()
            return res.status(200).send({
                status: true,
                message: "Add products to cart successfully",
                data: data
            });

        }catch(e){
            console.log(e)
            return res.status(500).send({
                status: false,
                message: "An error occurred while adding products to cart"
            });
        }
})

// delete product cart
cartRouter.delete('/:id',async(req,res)=>{
    const id = req.params.id;
    try{
     await AllCart.findByIdAndDelete({_id: id});
     return res.status(200).send({
        status:true,
        message: "deleted cart product"});
    }catch(e){
        console.log(e)
        return res.status(500).send({message: "error while deleting"});
    
    }
    })


module.exports  = cartRouter;