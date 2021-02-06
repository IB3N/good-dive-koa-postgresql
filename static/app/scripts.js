'use strict';

class Review {
  constructor (sitename, rating, content) {
    this.sitename = sitename;
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
  const {sitename, rating, content} = review;

  const $HTMLReview = $(`
    <div class="rev">
      <h1>${sitename}</h1>
      <p>${rating} / 5</p>
      <p>${content}</p>
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

    const sitename = $('#diveSite').val();
    const rating = $('#rating').val();
    const content = $('#content').val();

    if (sitename && rating && content) {
      $('#diveSite').val('');
      $('#rating').val('');
      $('#content').val('');

      const review = new Review(sitename, rating, content);
      insertReviewIntoDB(review);
      addReviewToPage(review);
    }
    else {
      if (!sitename) console.error('no site name 🥺');
      if (!rating) console.error('no rating 🥺');
      if (!content) console.error('no review 🥺');
    }
  });
});