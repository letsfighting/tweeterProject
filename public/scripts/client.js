const escaper = function (str) {
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  console.log("p: ", p);
  return p.innerHTML;
};

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (const post of tweets) {
    const $tweet = createTweetElement(post);

    $("#tweets-container").prepend($tweet);
    $("#tweets-container").text();
  }

  $(`#tweet-count`).text(140);
};

const createTweetElement = function (tweet) {
  console.log("tweet:", tweet.user.avatars);

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
  $.ajax({
    url: `/tweets/`,
    method: "GET",
  }).then(function (response) {
    console.log("getmethod resp:", response);
    //renders the tweets
    renderTweets(response);
  });
};

$(document).ready(function () {
  $("#err-div").hide();

  loadTweets();

  $("#form-submit").submit(function (event) {
    event.preventDefault();

    const tweetPost = $(this).serialize();
    console.log("tweetPost: ", tweetPost);
    console.log("event: ", event);
    console.log("this: ", this);

    if (tweetPost.length <= 5) {
      $(`#err-msg`).empty();
      $("#err-div").slideUp("fast", function () {});
      $(`#err-msg`).append("Post cannot be empty!");
      //  $(`#err-div`).removeClass("error-false");
      // $(`#err-div`).addClass("error-true");
      $(`#tweet-text`).addClass("error-true");
      $("#err-div").slideDown("fast", function () {
        // Animation complete.
      });
    } else if (tweetPost.length > 145) {
      $(`#err-msg`).empty();
      $("#err-div").slideUp("fast", function () {});
      $(`#err-msg`).append("Post length cannot exceed 140 characters!");
      // $(`#err-div`).removeClass("error-false");
      //$(`#err-div`).addClass("error-true");
      $(`#tweet-text`).addClass("error-true");
      $("#err-div").slideDown("fast", function () {});
    } else {
      $("#err-div").slideUp("fast", function () {});
      $(`#tweet-text`).removeClass("error-true");
      // $(`#err-div`).removeClass("error-true");
      // $(`#err-div`).addClass("error-false");

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

  /* to add hover color changes to buttons and boxshadows to hovered tweets - replaced with css id/class/element:hover method
  $("i.opt-btns").mouseover(function (event) {
    $(this).addClass("hoveredbtn");
  });

  $("i.opt-btns").mouseout(function (event) {
    $(this).removeClass("hoveredbtn");
  });
  
  $("article.tweet").mouseover(function (event) {
    $(this).addClass("hovered");
  });

  $("article.tweet").mouseout(function (event) {
    $(this).removeClass("hovered");
  });*/
});
