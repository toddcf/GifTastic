// Prevents JavaScript from running before HTML is finished loading:
$( document ).ready(function() {

	// Global Variables.
	// Array containing four TV comedies:
	var comedies = [
		"the simpsons",
		"futurama",
		"the office",
		"parks and recreation"
		];

	// Functions.


	// Main Processes.


    $("#addComedy").on('click', function() {
    	// $("#gifsAppearHere").empty();
        var comedies = $(this).attr("data-value");
        // Declares a variable and assigns it to the Giphy API URL -- with the userinput search word:
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + comedies + "&api_key=dc6zaTOxFJmzC&limit=10";

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
// This closing bracket line is driving me insane.
// No matter what I add or delete, console catches it as an error.
});


//     <button data-comedy="the simpsons">The Simpsons</button>
//     <button data-comedy="futurama">Futurama</button>
//     <button data-comedy="the office">The Office</button>
//     <button data-comedy="parks and recreation">Parks and Recreation</button>