$( document ).ready(function() {

	// Global Variables.
	var comedies = [
		"the simpsons",
		"futurama",
		"the office",
		"parks and recreation"
		];

	// Functions.


	// Main Processes.

    $('body').on('click', ".comedies", function() {
    	$("#gifsAppearHere").empty();
        var comedies = $(this).attr("data-value");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedies + "&api_key=dc6zaTOxFJmzC&limit=10";
	}
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                // step 1: Run this file, click a button, and see what the data looks like in the browser's console. Open up the Object, then open up the data key, then open up 0. Study the keys and how the JSON is structured.

                console.log(response)

                // step 2: since the image information is inside of the data key then make a variable named results and set it equal to response.data

                //------------put step 2 in between these dashes--------------------
                var results = response.data
                //--------------------------------

                for (var i = 0; i < results.length; i++) {
                	
                	// Declare local variables within the for loop:
                	var comedyDiv = $("<div>");
                    var comedyImage = $("<img>");
                    var comedyImageRating = results[i].rating;
                    // Set attributes for the comedyImage when still:
                    comedyImage.attr("src", results[i].fixed_height_still.url);
                    comedyImage.attr("data-state", "still");
                    comedyImage.attr("data-still", results[i].fixed_height_still.url);
                    // Set attributes for the comedyImage when animated:
                    comedyImage.attr("data-animate", results[i].fixed_height.url);
                    // Add class of "comedyImage" to the image:
                    comedyImage.addClass("comedyImage");
                    // Append image rating to the gif:
                    var appender = comedyImageDiv.append(comedyImage);
                    	appender.append("Rating: " + comedyImageRating);
                    	$("#gifsAppearHere").prepend(appender);
                }
    });
});

// Toggle between animated and still gifs:
$(".comedyImage").on('click', function() {
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



// "data-comedy" used to be "data-person"
//     <button data-comedy="the simpsons">The Simpsons</button>
//     <button data-comedy="futurama">Futurama</button>
//     <button data-comedy="the office">The Office</button>
//     <button data-comedy="parks and recreation">Parks and Recreation</button>