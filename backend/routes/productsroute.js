const express = require('express')
const AllProduct = require('../model/ProductModel/productmodel')

const productsRoute = express.Router();

// filter products
productsRoute.get('/filter-products', async (req, res) => {
    try {
        const { category, brand_namez,filtercategory,size} = req.query;

        const filter = [];

        if (category) {
            filter.push({ category: { $in: Array.isArray(category) ? category : [category] } });
        }

        if (brand_namez) {
            filter.push({ brand_namez: { $in: Array.isArray(brand_namez) ? brand_namez : [brand_namez] } });
        }

        if (filtercategory) {
            filter.push({ filtercategory: { $in: Array.isArray(filtercategory) ? filtercategory : [filtercategory] } });
        }

        if (size) {
            filter.push({ size: { $in: Array.isArray(size) ? size : [size] } });
        }

        const query = filter.length ? { $or: filter } : {};

        const products = await AllProduct.find(query);


        res.status(200).json({ status: true, data: products });
    } catch (error) {

        res.status(500).json({ status: false, message: error.message });
    }
});

// Search products based on a keyword
productsRoute.get('/search-products', async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({ status: false, message: 'Keyword is required for search.' });
        }

        const searchQuery = {
            $or: [
                { filtercategory: { $regex: keyword, $options: 'i' } },
            ]
        };

        const products = await AllProduct.find(searchQuery);

        res.status(200).json({ status: true, data: products });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
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
        discount_price_box, image,size,filtercategory } = req.body;
    try {
        const dataAdd = new AllProduct({ title, price, description, category, plp, brand_namez, discountedPriceText, actualPriceText, discount_price_box, image,size,filtercategory });
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
