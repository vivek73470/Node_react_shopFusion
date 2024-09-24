const express = require('express')
const AllProduct = require('../model/ProductModel/productmodel')

const productsRoute = express.Router();

// filter products
productsRoute.get('/filter-products', async (req, res) => {
    try {
        const categories = req.query.category;

        const filter = categories ? { category: { $in: Array.isArray(categories) ? categories : [categories] } } : {};

        const products = await AllProduct.find(filter);

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// All products 
productsRoute.get('/', async (req, res) => {
    try {
        const data = await AllProduct.find();
        return res.status(200).send({
            status: true,
            message: "Got all products successfully",
            data: data
        });
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            status: false,
            message: "An error occurred while fetching products"
        });
    }
})

// singlepage products
productsRoute.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const detailProduct = await AllProduct.findById(id)
        if (!detailProduct) {
            return res.status(404).send({ message: "single Product not found" });
        } if (detailProduct) {
            return res.status(200).send({
                message: "single Product found",
                data: detailProduct
            });
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "internal server error while fetching" })
    }
})


// add products
productsRoute.post('/add', async (req, res) => {
    const { title, price, description, category, plp, brand_namez, discountedPriceText, actualPriceText,
        discount_price_box, image } = req.body;
    try {
        const dataAdd = new AllProduct({ title, price, description, category, plp, brand_namez, discountedPriceText, actualPriceText, discount_price_box, image });
        await dataAdd.save()
        return res.status(200).send({
            status: true,
            message: "Add products successfully",
            data: dataAdd
        });
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            status: false,
            message: "An error occurred while adding products"
        });
    }
})

//edit products
productsRoute.put('/:id', async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    try {
        const data = await AllProduct.findByIdAndUpdate({ _id: id }, payload);
        return res.status(200).send({
            status: true,
            message: "update product successfully",
            data: data
        });
    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "error while updating" });

    }
})

// delete product
productsRoute.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await AllProduct.findByIdAndDelete({ _id: id });
        return res.status(200).send({
            status: true,
            message: "deleted product"
        });
    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: "error while deleting" });

    }
})


module.exports = productsRoute;
