/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("article.tweet").mouseover(function (event) {
    $(this).addClass("hovered");
  });

  $("article.tweet").mouseout(function (event) {
    $(this).removeClass("hovered");
  });

  $("i.opt-btns").mouseover(function (event) {
    $(this).addClass("hoveredbtn");
  });

  $("i.opt-btns").mouseout(function (event) {
    $(this).removeClass("hoveredbtn");
  });
});
