'use strict';

class Review {
  constructor (site, rating, content) {
    this.site = site;
    this.rating = rating;
    this.content = content;
  }
}

function reviewsGET () {
  $.get('/reviews', reviews => reviews.forEach(review => addReviewToPage(review)));
}

function insertReviewIntoDB (review) {
  $.ajax({
    url: '/reviews',
    method: 'POST',
    contentType: 'application/JSON',
    data: JSON.stringify(review),
  });
}

function pretty (time) {
 return new Date(time).toLocaleTimeString('en-GB', {
   hour: '2-digit',
   minute: '2-digit',
 });
}

function addReviewToPage (review) {
  const {site, rating, content, time} = review;

  const $HTMLReview = $(`
    <div class="rev">
      <h1>${site}</h1>
      <p>${rating} / 5</p>
      <p>${content}</p>
      <p>${pretty(time)}<p>
    </div>
  `);

  $('#reviewsContainer').append($HTMLReview);
}


$(() => {

  // retrieve all reviews from database
  reviewsGET();

  // listen for a review submission
  $('#postReview').on('click',(e) => {
    e.preventDefault();

    const site = $('#diveSite').val();
    const rating = $('#rating').val();
    const content = $('#content').val();

    if (site && rating && content) {
      $('#diveSite').val('');
      $('#rating').val('');
      $('#content').val('');

      const review = new Review(site, rating, content, Date.now());
      insertReviewIntoDB(review);
      addReviewToPage(review);
    }
    else {
      if (!site) console.error('no site 🥺');
      if (!rating) console.error('no rating 🥺');
      if (!content) console.error('no review 🥺');
    }
  });
});