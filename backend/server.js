const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const categories = JSON.parse(fs.readFileSync('./data/categories.json'));
const items = JSON.parse(fs.readFileSync('./data/products.json'));

//const topSaleIds = [66, 65, 73];
// теперь генерится случайный индекс эдемента items,
// и потом в массив topSaleIds помещаются ID товаров (items[rand_index].id)
const topSaleIds = [items[Math.floor(Math.random() * items.length)].id, items[Math.floor(Math.random() * items.length)].id, items[Math.floor(Math.random() * items.length)].id];
console.log('topSales: ', topSaleIds)

const moreCount = 6;

var orderID = 1;

const itemBasicMapper = item => ({
    id: item.id,
    category: item.category,
    title: item.title,
    price: item.price,
    images: item.images,
});

const randomNumber = (start, stop) => {
    return Math.floor(Math.random() * (stop - start + 1)) + start;
}

const fortune = (ctx, body = null, status = 200, successProb = 0.75, delay = 1) => {
    const delayMs = randomNumber(0, delay + 1) * 1000;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > successProb) {
                reject(new Error(ctx.method + ' ' + ctx.url + ' - Something bad happened'));
                return;
            }

            ctx.response.status = status;
            ctx.response.body = body;
            resolve();
        }, delayMs);
    })
}

const app = new Koa();
app.use(cors());
app.use(koaBody({
    json: true
}));

const router = new Router();

router.get('/api/top-sales', async (ctx, next) => {
    return fortune(ctx, items.filter(o => topSaleIds.includes(o.id)).map(itemBasicMapper));
});

router.get('/api/categories', async (ctx, next) => {
    return fortune(ctx, categories);
});

router.get('/api/items', async (ctx, next) => {
    const { query } = ctx.request;

    const categoryId = query.categoryId === undefined ? 0 : Number(query.categoryId);
    const offset = query.offset === undefined ? 0 : Number(query.offset);
    const q = query.q === undefined ? '' : query.q.trim().toLowerCase();

    const filtered = items
        .filter(o => categoryId === 0 || o.category === categoryId)
        .filter(o => o.title.toLowerCase().includes(q) || o.color.toLowerCase() === q)
        .slice(offset, offset + moreCount)
        .map(itemBasicMapper);

    return fortune(ctx, filtered);
});

router.get('/api/items/:id', async (ctx, next) => {
    const id = Number(ctx.params.id);
    const item = items.find(o => o.id === id);
    if (item === undefined) {
        return fortune(ctx, 'Not found', 404);
    }

    return fortune(ctx, item);
});

router.post('/api/order', async (ctx, next) => {
    const { owner: { phone, address }, items } = ctx.request.body;
    if (typeof phone !== 'string') {
        return fortune(ctx, 'Bad Request: Phone', 400);
    }
    if (typeof address !== 'string') {
        return fortune(ctx, 'Bad Request: Address', 400);
    }
    if (!Array.isArray(items)) {
        return fortune(ctx, 'Bad Request: Items', 400);
    }
    if (!items.every(({ id, price, count }) => {
        if (typeof id !== 'number' || id <= 0) {
            return false;
        }
        if (typeof price !== 'number' || price <= 0) {
            return false;
        }
        if (typeof count !== 'number' || count <= 0) {
            return false;
        }
        return true;
    })) {
        return fortune(ctx, 'Bad Request', 400);
    }

    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + randomNumber(1,5));
    const result = {
        order: orderID++,
        deliveryDate: deliveryDate
    };
    return fortune(ctx, result, 200, 0.3);
});

app.use(router.routes())
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);