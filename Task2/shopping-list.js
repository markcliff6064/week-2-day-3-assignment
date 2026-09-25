// TASK 2: DYNAMIC SHOPPING LIST



// Select all the elements we need from the HTML.

const itemNameInput = document.querySelector("#itemName");

const quantityInput = document.querySelector("#quantity");

const addItemButton = document.querySelector("#addItem");

const shoppingList = document.querySelector("#shoppingList");

const itemsRemaining = document.querySelector("#itemsRemaining");

const errorMessage = document.querySelector("#errorMessage");



// ADD ITEM
// Listen for a click on the Add Item button.
addItemButton.addEventListener("click", function () {

    // Get the item name typed by the user.
    // trim() removes unnecessary spaces at the beginning
    // and end of the text.
    const itemName = itemNameInput.value.trim();


    // Get the quantity.
    const quantity = quantityInput.value;



    // CHECK IF ITEM NAME IS EMPTY

    if (itemName === "") {

        // Display an error message.
        errorMessage.textContent = "Please enter an item name.";

        // Make the error message red.
        errorMessage.style.color = "red";

        // Stop the function here.
        return;
    }


    // Remove any previous error message.
    errorMessage.textContent = "";



    // CREATE THE LIST ITEM


    // Create a new <li> element.
    //
    // We are using createElement() instead of innerHTML
    // as required by the assignment.
    const li = document.createElement("li");


    // Create a span to hold the item information.
    const itemText = document.createElement("span");


    // Put the item name and quantity inside the span.
    itemText.textContent = itemName + " - Quantity: " + quantity;


    // Add the text to the list item.
    li.appendChild(itemText);


    // CREATE BOUGHT BUTTON
   

    const boughtButton = document.createElement("button");

    boughtButton.textContent = "Bought";


    // When the Bought button is clicked...
    boughtButton.addEventListener("click", function () {

        // Check whether the item has already been bought.
        if (li.classList.contains("bought")) {

            // If it has already been bought,
            // remove the bought styling.
            li.classList.remove("bought");

        } else {

            // Otherwise mark the item as bought.
            li.classList.add("bought");
        }


        // Update the remaining item count.
        updateRemainingCount();

    });


    // Add the Bought button to the list item.
    li.appendChild(boughtButton);


    // CREATE DELETE BUTTON


    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";


    // When Delete is clicked...
    deleteButton.addEventListener("click", function () {

        // Remove the entire <li> from the shopping list.
        li.remove();

        // Update the remaining item count.
        updateRemainingCount();

    });


    // Add the Delete button to the list item.
    li.appendChild(deleteButton);



    // ADD ITEM TO THE LIST
 

    shoppingList.appendChild(li);


    // CLEAR THE INPUTS
  

    itemNameInput.value = "";

    quantityInput.value = 1;


    // Update the remaining item counter.
    updateRemainingCount();

});



// UPDATE REMAINING ITEM COUNT


function updateRemainingCount() {

    // Select all <li> elements currently inside the list.
    const allItems = shoppingList.querySelectorAll("li");


    // Start with zero remaining items.
    let remaining = 0;


    // Go through every shopping item.
    allItems.forEach(function (item) {

        // If the item does NOT have the "bought" class,
        // it is still remaining.
        if (!item.classList.contains("bought")) {

            remaining++;
        }

    });


    // Display the number of remaining items.
    if (remaining === 1) {

        itemsRemaining.textContent = "1 item remaining";

    } else {

        itemsRemaining.textContent = remaining + " items remaining";

    }

}