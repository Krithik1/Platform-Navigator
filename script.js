var softwareData = [
    {
        Name: "Software A",
        Description: "This is software A description"
    },
    {
        Name: "Software B",
        Description: "This is software B description"
    },
    {
        Name: "Software C",
        Description: "This is software C description"
    }
    // Add more data objects as needed
];


// Generate card-like structures dynamically using the data object
var cardsContainer = document.querySelector('.cards-container');
softwareData.forEach(function (software) {
    var card = document.createElement('div');
    card.classList.add('card');

    var nameElement = document.createElement('h4');
    nameElement.textContent = software.Name;

    var descriptionElement = document.createElement('p');
    descriptionElement.textContent = software.Description;

    card.appendChild(nameElement);
    card.appendChild(descriptionElement);
    cardsContainer.appendChild(card);
});

document.addEventListener("DOMContentLoaded", function () {
    var cards = document.querySelectorAll(".card");
    var infoIfSelected = document.querySelector(".info-if-selected");
    var selectedProvidersList = document.querySelector(".selected-data-storage-providers-list");

    function toggleCardSelection() {
        this.classList.toggle("selected");
        checkStep3Visibility();
        updateSelectedProvidersList();
    }

    function checkStep3Visibility() {
        var selectedCards = document.querySelectorAll(".card.selected");
        infoIfSelected.style.display = selectedCards.length > 0 ? "block" : "none";
    }

    function updateSelectedProvidersList() {
        selectedProvidersList.innerHTML = "";
        var selectedCards = document.querySelectorAll(".card.selected");
        console.log(selectedCards);
        selectedCards.forEach(function (card) {
            var name = card.innerText.split("\n\n")[0];
            var description = card.innerText.split("\n\n")[1];
            var descriptionElement = document.createElement("p");
            descriptionElement.textContent = description;
            selectedProvidersList.appendChild(descriptionElement);
        });
    }

    cards.forEach(function (card) {
        card.addEventListener("click", toggleCardSelection);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var clearAnswersButton = document.querySelector(".clear-answers");
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    clearAnswersButton.addEventListener("click", function () {
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    });
});