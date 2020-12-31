const Product = require('../models/Product');
const Category = require('../models/Category');
const mongoose = require('mongoose');


const productsMapper = (arr) => {
    return {
        products: arr.map(({ id, title, images, category, subcategory, price, description }) => {
            return { id, title, images, category, subcategory, price, description }
        })
    };
}

const isValidateObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false;
    }
    return true;
}

module.exports.productsList = async (ctx, next) => {
    // await Category.deleteMany({});
    // await Product.deleteMany({});
    // const category = await Category.create({
    //     title: 'Category1',
    //     subcategories: [{
    //       title: 'Subcategory1',
    //     }],
    //   });
  
    //   await Product.create({
    //     title: 'Product1 is here',
    //     description: 'better than ProductB',
    //     price: 10,
    //     category: category.id,
    //     subcategory: category.subcategories[0].id,
    //     images: ['image1'],
    //   });
  
    //   await Product.create({
    //     title: 'Product1',
    //     description: 'better than ProductA',
    //     price: 10,
    //     category: category.id,
    //     subcategory: category.subcategories[0].id,
    //     images: ['image1'],
    //   });
    if (ctx.query.subcategory) {
        if (!isValidateObjectId(ctx.query.subcategory)) {
            ctx.status = 400;
            ctx.body = { message: "invalid id" };
            return;
        };
        const productsBySubCategory = await Product.find({ subcategory: mongoose.Types.ObjectId(`${ctx.query.subcategory}`) });
        ctx.status = 200;
        ctx.body = productsMapper(productsBySubCategory);
    } else if (ctx.query.query) {
        console.log('HERE')
        const findedProducts = await Product.find({$text: {$search: `"${ctx.query.query}"`}});
        ctx.body = productsMapper(findedProducts);
    }
    else {
        const products = await Product.find({});
        ctx.status = 200;
        ctx.body = productsMapper(products)
    }

    return next();
}

module.exports.productById = async (ctx, next) => {
    if (!isValidateObjectId(ctx.params.id)) {
        ctx.status = 400;
        ctx.body = { message: "invalid id" };
        return;
    } else {
        const product = await Product.findById(ctx.params.id);
        if (product === null) {
            ctx.status = 404;
            ctx.body = { message: "not found" };
            return;
        }
        ctx.status = 200;
        ctx.body = {
            product: {
                id: product.id,
                title: product.title,
                images: product.images,
                category: product.category,
                subcategory: product.subcategory,
                price: product.price,
                description: product.description
            }
        }
    }
}