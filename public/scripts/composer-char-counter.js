$(document).ready(function () {
  // --- our code goes here ---
  console.log("Document ready");

  $("textarea").on("input", function (event) {
    let x = $("textarea").val().length;

    $(this)
      .next("div")
      .children("output")
      .text(140 - x);

    if (x > 140) {
      $(this).next("div").children("output").addClass("numNeg");
    } else {
      $(this).next("div").children("output").removeClass("numNeg");
    }
  });
});
