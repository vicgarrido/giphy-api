$(document).ready(function() {

    // array of strings saved under variable
    var topics = [ "Pikachu" , "Charizard" , "Mewtwo" , "Lucario" ];

    // take topics in array and make buttons in HTML, using a loop
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        // 
        $(areaToAddTo).empty();
// this is a for loop. the "i" variable set to 0, "i" is less than length of array, "i++" adds 1 every time it loops
        for (var i = 0; i < arrayToUse.length; i++) {
            // what happens during the loop
            var a  = $("<button>");
            // adds the "classToAdd" function as a class
            a.addClass(classToAdd);
            // gets attribute value of first element
            a.attr("data-type", arrayToUse[i]);
            // combines text content of each element
            a.text(arrayToUse[i]);
            // insterts content within parameters
            $(areaToAddTo).append(a);
        }
    }

    // binds click event to the button
    $(document).on("click", ".poke-button", function() {
        // empties div
        $("#pokemon").empty();
        // add ".active" to CSS button
        $(".poke-button").removeClass("active");
        // probably calls back to the button-making function
        $(this).addClass("active");

        // addresses the Giphy API
        var type = $(this).attr("data-type");
        // request the API key here
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

        // AJAX request
        $.ajax({
            url:queryURL,
            method: "GET"
        })
        // if request comes through, THEN this function activates
            .then(function(response) {
                var results = response.data;
                // for loop again
                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $("<div class=\"poke-item\">");

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var pokeImage = $("<img>");
                    pokeImage.attr("src", still);
                    pokeImage.attr("data-still", still);
                    pokeImage.attr("data-animate", animated);
                    pokeImage.attr("data-state", "still");
                    pokeImage.addClass("poke-image");

                    pokeDiv.append(p);
                    pokeDiv.append(pokeImage);

                    $("#pokemon").append(pokeDiv);
                }
            });
        });

        $(document).on("click", ".poke-image", function () {

            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });

        $("#add-pokemon").on("click", function(event) {
            event.preventDefault();
            var newPokemon = $("input").eq(0).val();

            if (newPokemon.length > 2) {
                newPokemon.push(newPokemon);
            }

            populateButtons(pokemon, "poke-buttons", "#poke-buttons");
        });

        populateButtons(pokemon, "poke-buttons", "#poke-buttons");
});

