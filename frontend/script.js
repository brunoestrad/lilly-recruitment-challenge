
// Use query selector to interact with the DOM
const availableMeds = document.querySelector(".available-meds");
const medicineCard = document.querySelector(".medicine-card");
// Forms
const addMedsForm = document.querySelector(".add-form");
const deleteMedsForm = document.querySelector(".delete-form");
const updateMedsForm = document.querySelector(".update-form");
// Forms values
const nameInputAdd = document.querySelector(".name-add");
const priceInputAdd = document.querySelector(".price-add");
const nameInputUpdate = document.querySelector(".name-update");
const priceInputUpdate = document.querySelector(".price-update");
const nameInputDelete = document.querySelector(".name-delete");

// Fetch all medicines from data.json
async function getAllMedicines(){
    // Error-handling
    try {
        // GET request to backend
        const response = await fetch("http://localhost:8000/medicines");

        // Check if response status is ok
        if(!response.ok){
            throw new Error("Could not fetch medicines data");
        }

        const result = await response.json();

        displayMedicine(result.medicines); // Call display medicine with medicines array as parameter

    } catch (error) { // If there is an error, error message will be displayed as medicine card
        const errorDisplay = document.createElement("p");
        errorDisplay.classList.add("medicine-card");
        errorDisplay.textContent = "Error fetching medicines: " + error;
        errorDisplay.style = "color: red", "justify-content: center";
        availableMeds.appendChild(errorDisplay);
    }
    
}

// Called within getAllMedicines function 
function displayMedicine(medicines){

    medicines.forEach((medicine) => {
        const { name, price } = medicine; // Destructuring medicine data from JSON
        
        // Create card
        const medicineCard = document.createElement("div");
        const medicineDisplay = document.createElement("h3");
        const priceDisplay = document.createElement("p");
        
        // Check for null and add values to medicine card
        medicineDisplay.textContent = (name) ? name : "Name not available";
        priceDisplay.textContent = (price) ? `£${price}` : "Price not available";
        
        // Add class to elements
        medicineCard.classList.add("medicine-card");
        medicineDisplay.classList.add("medicine-name");
        priceDisplay.classList.add("medicine-price");
        
        // Append the card to the available meds container
        medicineCard.appendChild(medicineDisplay);
        medicineCard.appendChild(priceDisplay);
        availableMeds.appendChild(medicineCard);
    });

}

// Fetch medicines when page loads
getAllMedicines();

// After submit button pressed on add new medicine form
addMedsForm.addEventListener("submit", async event => {
    event.preventDefault();

    // Get value from inputs
    const name = nameInputAdd.value;
    const price = priceInputAdd.value;

    // Check if inputs are not empty
    if(name && price){
        // Error handling
        try{
            // Create form data object (supported by main.py file)
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);

            // POST request to backend
            const response = await fetch("http://localhost:8000/create", {
                method: "POST",
                body: formData
            });

            // Check if response is ok
            if(!response.ok){
                throw new Error("Failed to add medicine");
            }
            
            // Wait for completion message and display message as alert
            const result = await response.json();
            alert(result.message);

        } catch(error){
            // Display error as alert
            alert("Failed to add medicine");
        }
    }
    else {
        alert("Please, enter name and price for medicine");
    }

});

// After submit button pressed on update medicine form
updateMedsForm.addEventListener("submit", async event => {
    event.preventDefault();

    // Get value from inputs
    const name = nameInputUpdate.value;
    const price = priceInputUpdate.value;

    // Check if inputs are not empty
    if(name && price){
        // Error handling
        try {
            // Create form data object (supported by main.py file)
            formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);

            // POST request to backend
            const response = await fetch("http://localhost:8000/update", {
                method: "POST",
                body: formData
            })

            // Check if response is ok
            if(!response.ok){
                throw new Error("Failed to update medicine");
            }

            // Wait for completion message and display message as alert
            const result = await response.json();
            alert(result.message);

        } catch (error) {
            // Display error as alert
            alert("Failed to update medicine")
        }
    }else{
        alert("Please, enter name and price for medicine");
    }

});

// After submit button pressed on delete medicine form
deleteMedsForm.addEventListener("submit", async event => {
    event.preventDefault();

    // Get value from inputs
    const name = nameInputDelete.value;

    // Check if inputs are not empty
    if(name){
        // Error handling
        try{
            // Create form data object (supported by main.py file)
            const formData = new FormData();
            formData.append("name", name);

            // DELETE request to backend
            const response = await fetch("http://localhost:8000/delete", {
                method: "DELETE",
                body: formData
            })

            // Check if response is ok
            if(!response.ok){
                throw new Error("Failed to delete medicine");
            }

            // Wait for completion message and display message as alert
            const result = await response.json();
            alert(result.message)

        }catch(error){
            // Display error as alert
            alert("Failed to delete medicine");
        }

    }else{   
        alert("Please, enter the name of the medicine")  
    }

});

// Fetch average price of all medicines and display
async function displayAverage(){
    // Error handling
    try {
        // GET request to backend
        const response = await fetch("http://localhost:8000/average");

        // Check if response is ok
        if(!response.ok){
            throw new Error("Could not fetch average");
        }

        const result = await response.json();

        // Update text content for average with result
        document.getElementById("average").textContent = `Average price for medicines: £${result.average.toFixed(2)}`;

    } catch (error) {
        // Update text content to be error
        document.getElementById("average").textContent = `Error fetching average data: ${error}`;
    }
    
}

// Fetch and display average data when page loads
displayAverage();