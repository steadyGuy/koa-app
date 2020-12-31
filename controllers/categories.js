const { id } = require('../libs/connection');
const Category = require('../models/Category');

module.exports.categoriesList = async (ctx, next) => {
    const categories = await Category.find({});
    ctx.status = 200;
    ctx.body = {
        categories: categories.map(({ id, title, subcategories }) => {
            const mapedSubcategories = subcategories.map(({ title, id }) => { return { title, id } });
            return { id, title, subcategories: mapedSubcategories }
        })
    };
    return next();
}