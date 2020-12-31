const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const { categoriesList } = require('./controllers/categories');
const { productsList, productById } = require('./controllers/products');

const app = new Koa();
const router = new Router({ prefix: '/api' });


app.use(require('koa-bodyparser')());
app.use(require('koa-static')(path.join(__dirname, 'public')));

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err.status) {
            ctx.status = err.status;
            ctx.body = { error: err.message };
        } else {
            console.error(err);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }
});

router.post('/login', login);

router.get('/api/categories', categoriesList);
router.get('/api/products', productsList);
router.get('/api/products/:id', productById);


app.use(router.routes());

module.exports = app;