'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const bodyparser = require('koa-bodyparser');
const morgan = require('koa-morgan');

const router = require('./router');
const app = new Koa();

app.use(morgan('dev'));
app.use(serve('./static/app'));
app.use(bodyparser());
app.use(router.routes());


const PORT = '3000';
app.listen(PORT, () => console.log(`🤜  Server checking in at http://localhost:${PORT}  🤛`));
