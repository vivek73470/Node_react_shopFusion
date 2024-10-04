const express = require('express');
const authenticate = require('../middleware/adminauth.middleware')
const Allorder = require('../model/order/ordermodel')

const orderRouter = express.Router();

// get all order
orderRouter.get('/',authenticate, async(req,res)=>{
    try {
        const data = await Allorder.find();
        return res.status(200).send({
            status: true,
            message: "Got all orders successfully",
            data: data
        });
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            status: false,
            message: "An error occurred while fetching order products"
        });
    }
})

// order add
orderRouter.post('/add',authenticate,async(req,res)=>{
    const { title, price, description, category, plp, brand_namez, discountedPriceText, actualPriceText,
        discount_price_box, image,filtercategory,size} = req.body;
        try{
            const data = new Allorder({title, price, description, category, plp, brand_namez, discountedPriceText, actualPriceText, discount_price_box, image,filtercategory,size}) 
            await data.save()
            return res.status(200).send({
                status: true,
                message: "Add products to order successfully",
                data: data
            });

        }catch(e){
            console.log(e)
            return res.status(500).send({
                status: false,
                message: "An error occurred while adding products to order"
            });
        }
})

// delete order 
orderRouter.delete('/:id',authenticate, async(req,res)=>{
    const id = req.params.id;
    try{
     await Allorder.findByIdAndDelete({_id: id});
     return res.status(200).send({
        status:true,
        message: "deleted order product"});
    }catch(e){
        console.log(e)
        return res.status(500).send({message: "error while deleting"});
    
    }
    })

module.exports = orderRouter;