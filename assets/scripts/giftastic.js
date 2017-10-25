// window load
$(document).ready(function() {  

  // search buttin click, add new animal button
  $("#search").on("click", function() {
    //pull search value
    var searchValue = $("#animal-input").val().trim(); 
    console.log(searchValue);

    //create button of searched term
    $(".buttons").append('<button type="button" class="btn btn-danger animal-button" data-animal="' + searchValue + '">' + searchValue + '</button>');

    //clear input
    $("#animal-input").val("");
  });

  $("body").on("click", "#clear", function() {
    // remove all buttons
    $(".buttons").html("");
    $(".gifs-here").html("");
  });

  // animal button click, display gif
  $("body").on("click", ".animal-button", function() {
  
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({ 
      url: queryURL,
      method: "GET"
      })
      .done(function(response) {
        var results = response.data;

        console.log(results);

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $(".gifs-here");

            var gifRating = results[i].rating;

            var p = $("<p>").text("Rating: " + gifRating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.attr("url-animate", results[i].images.fixed_height.url);
            animalImage.attr("url-still", results[i].images.fixed_height_still.url);
            animalImage.attr("state", "active");
            animalImage.attr("class", "gifs");

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#gifs-here").prepend(gifDiv);
          }
        });
    });

  //pause/play gif when clicked
  $("body").on("click", ".gifs", function() { //.gif class?

    console.log(this);

    var state = $(this).attr("state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("url-animate"));
      $(this).attr("state", "active");
    }
    else if (state === "active") {
      $(this).attr("src", $(this).attr("url-still"));
      $(this).attr("state", "still");
    }
  });

});