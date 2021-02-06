'use strict';

const {findAll, insertReview} = require('../models/reviews-model');

exports.getReviews = async ctx => {
  try {
    const reviews = await findAll();
    ctx.body = reviews;
    ctx.status = 200;
  } catch (o_0) {
    console.error(o_0);
    ctx.status = 500;
  }
};

exports.postReview = async ctx => {
  try {
    await insertReview(ctx.request.body);
    ctx.status = 201;
  } catch (o_0) {
    console.error(o_0);
    ctx.status = 501;
  }
};