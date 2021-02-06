'use strict';

const Router = require('koa-router');
const router = new Router();

const { getReviews, postReview } = require('./controllers/reviews');

router.get('/reviews', getReviews);
router.post('/reviews', postReview);

module.exports = router;