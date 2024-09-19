const mongoose = require('mongoose');

const Connection = mongoose.connect('mongodb+srv://vivekyadav:vivek@cluster0.a6a8a.mongodb.net/TopshopDb');

module.exports = Connection