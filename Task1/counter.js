// TASK 1: CHARACTER COUNTER

// Select the textarea from the HTML.
const textarea = document.querySelector("#message");

// Select the paragraph that displays the character count.
const counter = document.querySelector("#counter");


// Listen for every change made inside the textarea.
// The "input" event happens whenever the user:
// - types a character
// - deletes a character
// - pastes text
// - changes the content
textarea.addEventListener("input", function () {

    // Get whatever the user has typed.
    const text = textarea.value;

    // .length tells us how many characters are in the text.
    const count = text.length;

    // Display the current number of characters.
    counter.textContent = count + "/280 characters";


   
    // CHANGE COLOURS BASED ON CHARACTER COUNT

    // If the user has exceeded 280 characters,
    // make both the counter and textarea border red.
    if (count > 280) {

        counter.style.color = "red";
        textarea.style.borderColor = "red";

    }

    // If the count is between 261 and 280,
    // the user is close to reaching the limit.
    else if (count >= 261 && count <= 279) {

        counter.style.color = "orange";
        textarea.style.borderColor = "orange";

    }

    // Otherwise, the user is still safely below the limit.
    else {

        counter.style.color = "black";
        textarea.style.borderColor = "#ccc";

    }

});