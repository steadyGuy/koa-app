const { Schema } = require('mongoose');
const connection = require('../libs/connection');

const SubCategorySchema = new Schema({
    title: {
        type: String,
        required: true,
    }
});

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subcategories: [SubCategorySchema]
});

module.exports = connection.model('Category', CategorySchema);