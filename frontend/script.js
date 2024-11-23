
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

async function getAllMedicines(){
    try {
        const response = await fetch("http://localhost:8000/medicines");

        if(!response.ok){
            throw new Error("Could not fetch medicines data");
        }

        const result = await response.json();

        displayMedicine(result.medicines);

    } catch (error) {
        const errorDisplay = document.createElement("p");
        errorDisplay.classList.add("medicine-card");
        errorDisplay.textContent = "Error fetching medicines!";
        errorDisplay.style = "color: red", "justify-content: center";
        availableMeds.appendChild(errorDisplay);
    }
    
}

function displayMedicine(medicines){

    medicines.forEach((medicine) => {
        const { name, price } = medicine; // Destructuring medicines data from JSON
        
        const medicineCard = document.createElement("div");
        const medicineDisplay = document.createElement("h3");
        const priceDisplay = document.createElement("p");
    
        medicineDisplay.textContent = (name) ? name : "Name not available";
        priceDisplay.textContent = (price) ? `£${price}` : "Price not available";
        
        medicineCard.classList.add("medicine-card");
        medicineDisplay.classList.add("medicine-name");
        priceDisplay.classList.add("medicine-price");
        
        medicineCard.appendChild(medicineDisplay);
        medicineCard.appendChild(priceDisplay);
        availableMeds.appendChild(medicineCard);
    });

}

getAllMedicines();

addMedsForm.addEventListener("submit", async event => {

    event.preventDefault();

    const name = nameInputAdd.value;
    const price = priceInputAdd.value;

    if(name && price){
        try{
            // Create form data object
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);

            // POST request to backend
            const response = await fetch("http://localhost:8000/create", {
                method: "POST",
                body: formData
            });

            if(!response.ok){
                throw new Error("Failed to add medicine");
            }

            const result = await response.json();
            alert(result.message);

        } catch(error){
            console.error("Error: ", error);
            alert("Failed to add medicine");
        }
    }
    else {
        alert("Please, enter name and price for medicine");
    }

});

updateMedsForm.addEventListener("submit", async event => {
    event.preventDefault();

    const name = nameInputUpdate.value;
    const price = priceInputUpdate.value;

    if(name && price){
        try {
            formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);

            const response = await fetch("http://localhost:8000/update", {
                method: "POST",
                body: formData
            })

            if(!response.ok){
                throw new Error("Failed to update medicine");
            }

            const result = await response.json();
            alert(result.message);

        } catch (error) {
            alert("Failed to update medicine")
        }



    }else{
        alert("Please, enter name and price for medicine");
    }

});

deleteMedsForm.addEventListener("submit", async event => {
    event.preventDefault();

    const name = nameInputDelete.value;

    if(name){
        try{
            const formData = new FormData();
            formData.append("name", name);

            const response = await fetch("http://localhost:8000/delete", {
                method: "DELETE",
                body: formData
            })

            if(!response.ok){
                throw new Error("Failed to delete medicine");
            }

            const result = await response.json();
            alert(result.message)

        }catch(error){
            alert("Failed to delete medicine");
        }

    }else{   
        alert("Please, enter the name of the medicine")  
    }

});