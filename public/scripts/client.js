const escaper = function (str) {
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  $("#tweets-container").empty();

  for (const post of tweets) {
    const $tweet = createTweetElement(post);

    $("#tweets-container").prepend($tweet);
    $("#tweets-container").text();
  }

  $(`#tweet-count`).text(140);
};

const createTweetElement = function (tweet) {
  //creates tweet html

  const tweetElement = `<article class="tweet">
    <header>
    <span>
    <img src=${tweet.user.avatars} alt=${tweet.user.name}>
    </span>
    <span class="name">${tweet.user.name}</span>
    </header>

    <p>${escaper(tweet.content.text)}</p>

    <footer>
      <span id="days-ago">${timeago.format(tweet.created_at)}</span>
      <span id="fn-btns">
        <i class="fa-solid fa-flag opt-btns"></i>
        <i class="fa-solid fa-retweet opt-btns"></i>
        <i class="fa-solid fa-heart opt-btns"></i>
      </span>
    </footer>
  </article>`;

  return tweetElement;
};

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const loadTweets = function () {
  //ajax handles the GET requests for /tweets/ asynchronously

  $.ajax({
    url: `/tweets/`,
    method: "GET",
  }).then(function (response) {
    console.log("getmethod resp:", response);
    //renders the tweets
    renderTweets(response);
  });
};

const newTweet = function () {};

$(document).ready(function () {
  $("#err-div").hide();

  loadTweets();

  $("#form-submit").submit(function (event) {
    event.preventDefault();

    const tweetPost = $(this).serialize();

    //conditionals to restrict posting to within 140 characters.
    if (tweetPost.length <= 5) {
      $(`#err-msg`).empty();
      $("#err-div").slideUp("fast", function () {});
      $(`#err-msg`).append("Post cannot be empty!");

      $(`#tweet-text`).addClass("error-true");
      $("#err-div").slideDown("fast", function () {});
    } else if (tweetPost.length > 145) {
      $(`#err-msg`).empty();
      $("#err-div").slideUp("fast", function () {});
      $(`#err-msg`).append("Post length cannot exceed 140 characters!");
      $(`#tweet-text`).addClass("error-true");
      $("#err-div").slideDown("fast", function () {});
    } else {
      $("#err-div").slideUp("fast", function () {});
      $(`#tweet-text`).removeClass("error-true");
      $.ajax({
        url: `/tweets/`,
        method: "POST",
        data: tweetPost,
      }).then(function (response) {
        console.log("postmethod resp: ", response);
        loadTweets();
        $("#tweet-text").val("");
      });
    }
  });
});
