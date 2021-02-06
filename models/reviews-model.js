'use strict';

const pool = require('./db-init');

exports.findAll = async () => {
  console.log(pool);
  const res = await pool.query('SELECT * FROM reviews;');
  return res.rows;
};

exports.insertReview = async review => {
  const {sitename, rating, content} = review;
  console.log(sitename, rating, content);
  await pool.query(`INSERT INTO reviews (sitename, rating, content) values (${sitename}, ${Number(rating)}, ${content});`);
};