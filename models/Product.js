const { Schema } = require('mongoose');
const connection = require('../libs/connection');

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        required: true
    },
    images: [String]
});

ProductSchema.index({ title: "text", description: "text" }, {
    weights: { title: 10, description: 5 },
    default_language: "russian",
    name: "TextSearchIndex",
});

module.exports = connection.model('Product', ProductSchema);