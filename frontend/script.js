
const availableMeds = document.querySelector(".available-meds");
const medicineCard = document.querySelector(".medicine-card");

async function getAllMedicines(){
    const url = "http://localhost:8000/medicines";

    try {
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Could not fetch medicines data");
        }

        const data = await response.json();

        displayMedicine(data.medicines);
        
    } catch (error) {
        console.log ("Error fetching medicines: ", error);
    }
    
}

function displayMedicine(medicines){

    medicines.forEach((medicine) => {
        const { name, price } = medicine; // Destructuring medicines data from JSON
        
        const medicineCard = document.createElement("div");
        const medicineDisplay = document.createElement("h3");
        const priceDisplay = document.createElement("p");
    
        medicineDisplay.textContent = name;
        priceDisplay.textContent = `£${price}`;
        
        medicineCard.classList.add("medicine-card");
        medicineDisplay.classList.add("medicine-name");
        priceDisplay.classList.add("medicine-price");
        
        medicineCard.appendChild(medicineDisplay);
        medicineCard.appendChild(priceDisplay);
        availableMeds.appendChild(medicineCard);
    });

}

getAllMedicines();