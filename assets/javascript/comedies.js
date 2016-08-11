// Prevents JavaScript from running before HTML is finished loading:
// $( document ).ready(function() {
// Commented out for debugging.

	// Array containing four TV comedies:
	var comedies = [
		"the simpsons",
		"futurama",
		"the office",
		"parks and recreation"
		];


    $("body").on('click', ".comedies", function() {
    	$("#gifsAppearHere").empty();
        var comedies = $(this).attr("data-value");
        // Declares a variable and assigns it to the Giphy API URL -- with the userinput search word:
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedies + "&api_key=dc6zaTOxFJmzC&limit=10";

        // This gets a gif from the search url listed above:
        $.ajax({
                url: queryURL,
                method: 'GET'
            })

        	// Retrieves the response object...
            .done(function(response) {
                console.log(response)

                var results = response.data


                for (var i = 0; i < results.length; i++) {
                	
                	// Declare local variables within the for loop:
                	var comedyDiv = $("<div>");
                    var comedyImage = $("<img>");
                    var comedyImageRating = results[i].rating;
                    // Set attributes for the comedyImage when still:
                    comedyImage.attr("src", results[i].images.fixed_height_still.url);
                    comedyImage.attr("data-state", "still");
                    comedyImage.attr("data-still", results[i].images.fixed_height_still.url);
                    // Set attributes for the comedyImage when animated:
                    comedyImage.attr("data-animate", results[i].images.fixed_height.url);
                    // Add class of "comedyImage" to the image:
                    comedyImage.addClass("comedyImage");
                    // Append image rating to the gif:
                    var appender = comedyDiv.append(comedyImage);
                    	appender.append("Rating: " + comedyImageRating);
                    	$("#gifsAppearHere").prepend(appender);
                }
            
    });
});

	// Toggle between animated and still gifs:
	$("body").on('click', ".comedyImage", function() {
		// Declare variable of state so the jQuery code is more manageable:
		var state = $(this).attr("data-state");
		// Console log the state for your own reference:
		console.log(state);

		// Declare variables for jQuery code for animated and still gifs:
		var $animate = $(this).attr("data-animate");
		var $still = $(this).attr("data-still");

		// If the gif is still, clicking it will change its state to animated:
		if (state === "still") {
			$(this).attr("src", $animate)
			$(this).attr("data-state", "animate")
		}
		// If the gif is NOT still, click it will change its state to still:
		else {
			$(this).attr("src", $still)
			$(this).attr("data-state", "still")
		}
	});

	// Create buttons dynamically:
	function makeButton() {
		$("#displayButtons").empty();
		for (i = 0; i < comedies.length; i++){
			var button = $("<button>");
			button.addClass("comedies");
			button.attr("data-value", comedies[i]);
			button.text(comedies[i]);
			button.addClass("btn");
			button.addClass("btn-info");
			$("#displayButtons").append(button);
		}
	}


	$("#addButton").on("click", function(){
		var comedyInput = $("#comedyName").val().trim();
			comedies.push(comedyInput);

			makeButton();
			
			// return false;

	});

	makeButton();

// GH-Pages: https://toddcf.github.io/GifTastic/
// Heroku: https://peaceful-tundra-86223.herokuapp.com