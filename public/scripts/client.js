/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweet) {
  //decoding strings
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerText;
  };

  const htmlTweet = `
                 <article class="tweet">
                <div id="show-tweets">
                <div id="tweet-profiles">
                 <img id="tweet-avatar" src='${tweet.user.avatars}'>
                 <span id="username">${tweet.user.name}</span>
                </div>
                <div id="tweets">                  
                  <p>${escape(tweet.content.text)}</p>
                  <hr>
                  <p id="date">${moment(tweet.created_at).fromNow()}</p>
                  <span id="icons">
                    <a href=""><i class="fas fa-flag"></i></a>
                    <a href=""><i class="fas fa-retweet"></i></a>
                    <a href=""><i class="fas fa-heart"></i></span></a>
                </div>
              </div>
              </article>
    `;
  return htmlTweet;
};

//rendering tweets
const renderTweets = function (tweetData) {
  $("#tweets-container").empty();
  for (let tweet of tweetData) {
    let $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
};

// loading func tweets from json

$(() => {
  //hide error message until triggered
  $("#error-message").hide();

  const loadTweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    })
      .done((tweet) => {
        renderTweets(tweet);
      })
      .fail(() => console.log("Error!"))
      .always(() => console.log("Request completed"));
  };
  loadTweets();

  const $form = $("#tweet-form");
  $form.on("submit", function (event) {
    event.preventDefault();
    $("#error-message").slideUp("slow");
    const tweetIt = $("#tweet-text").val().length;
    if (tweetIt > 140) {
      $("#error-message").html(
        "<p> Your tweet is too long! Keep below 140 characters!"
      );
      $("#error-message").slideDown("slow");
      return;
    }
    if (tweetIt === 0) {
      $("#error-message").html(
        "<p> Please input something! Don't think! This is Tweeter!"
      );
      $("#error-message").slideDown("slow");
      return;
    }
    const serializedData = $(this).serialize();

    $.post("/tweets", serializedData, (response) => {
      loadTweets();
      $("#tweet-text").val("");
      $(".counter").val(140);
    });
  });
});
