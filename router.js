'use strict';

const Router = require('koa-router');
const router = new Router();

// const reviewController = require('./controllers/reviews-model');

router.get('/reviews');
router.post('/reviews');

module.exports = router;