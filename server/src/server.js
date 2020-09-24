const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

const mongo = require('koa-mongo');
const dbName = 'test';

router
  .get('/anime', async (ctx) => {
    ctx.body = await ctx.mongo.db(dbName).collection('anime').find().toArray();
  })
  .post('/anime', async (ctx) => {
    ctx.body = await ctx.mongo.db(dbName).collection('anime').insertOne(ctx.request.body);
  })
  .put('/anime', async (ctx) => {
    console.log('Try put.', ctx.request.body);
  })
  .del('/anime', async (ctx) => {
    console.log('Try delete.', ctx.request.body);
  });

app
  .use(cors())
  .use(mongo())
  .use(bodyParser())
  .use(router.routes());


app.listen(8080);
