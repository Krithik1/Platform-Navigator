var softwareData = [
    {
        Name: "Software A",
        Description: "This is software A description",
        risk: "high",
        type: "backup",
        collab: "public",
        access: "mobile",
        dataStorage: "under100"
    },
    {
        Name: "Software B",
        Description: "This is software B description",
        risk: "medium",
        type: "backup",
        collab: "otherUBCresearchers",
        access: "laptop",
        dataStorage: "100to1"
    },
    {
        Name: "Software C",
        Description: "This is software C description",
        risk: "low",
        type: "activereseach",
        collab: "public",
        access: "laptop",
        dataStorage: "1to5"
    }
    // Add more data objects as needed
];


// Generate card-like structures dynamically using the data object
var cardsContainer = document.querySelector('.cards-container');
softwareData.forEach(function (software) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.classList.add(software.risk);
    card.classList.add(software.type);
    card.classList.add(software.collab);
    card.classList.add(software.access);
    card.classList.add(software.dataStorage);

    var nameElement = document.createElement('h4');
    nameElement.textContent = software.Name;

    var descriptionElement = document.createElement('p');
    descriptionElement.textContent = software.Description;

    card.appendChild(nameElement);
    card.appendChild(descriptionElement);
    cardsContainer.appendChild(card);
});

// TODO: Ask about functionality of the checkboxes and highlighting

function onlyOne(checkbox) {
    var checkboxes = document.querySelectorAll('.risk')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

document.addEventListener("DOMContentLoaded", function () {
    var cards = document.querySelectorAll(".card");
    var infoIfSelected = document.querySelector(".info-if-selected");
    var selectedProvidersList = document.querySelector(".selected-data-storage-providers-list");
    var step2SelectAllButton = document.querySelector(".step2-select-all");
    var step2ClearAnswersButton = document.querySelector(".step2-clear-selections");
    var clearAnswersButton = document.querySelector(".clear-answers");
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var riskCheckboxes = document.querySelectorAll('.risk');
    var typeCheckboxes = document.querySelectorAll('.type');
    var collabCheckboxes = document.querySelectorAll('.collab');
    var accessCheckboxes = document.querySelectorAll('.access');
    var dataStorageCheckboxes = document.querySelectorAll('.data-storage');
    console.log(riskCheckboxes);

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

    step2SelectAllButton.addEventListener("click", function () {
        cards.forEach(function (card) {
            card.classList.add("selected");
        });
        updateSelectedProvidersList();
        checkStep3Visibility();
    });

    step2ClearAnswersButton.addEventListener("click", function () {
        cards.forEach(function (card) {
            card.classList.remove("selected");
        });
        updateSelectedProvidersList();
        checkStep3Visibility();
    });

    clearAnswersButton.addEventListener("click", function () {
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    });

    cards.forEach(function (card) {
        card.addEventListener("click", toggleCardSelection);
    });

    // TODO: Fix the checkboxes so that they work properly

    // Toggle selected class if risk checkbox is clicked and if the checkbox is not checked then remove selected class
    riskCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("click", function () {
            var risk = checkbox.classList[1];
            if (checkbox.checked) {
                cards.forEach(function (card) {
                    if (card.classList.contains(risk)) {
                        card.classList.add("selected");
                    }
                });
            } else {
                cards.forEach(function (card) {
                    if (card.classList.contains(risk)) {
                        card.classList.remove("selected");
                    }
                });
            }
            updateSelectedProvidersList();
            checkStep3Visibility();
        });
    });

    // Toggle selected class if type checkbox is clicked and if the checkbox is not checked then remove selected class
    typeCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("click", function () {
            var type = checkbox.classList[1];
            if (checkbox.checked) {
                cards.forEach(function (card) {
                    if (card.classList.contains(type)) {
                        card.classList.add("selected");
                    }
                });
            } else {
                cards.forEach(function (card) {
                    if (card.classList.contains(type)) {
                        card.classList.remove("selected");
                    }
                });
            }
            updateSelectedProvidersList();
            checkStep3Visibility();
        });
    });

    // Toggle selected class if collab checkbox is clicked and if the checkbox is not checked then remove selected class
    collabCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("click", function () {
            var collab = checkbox.classList[1];
            if (checkbox.checked) {
                cards.forEach(function (card) {
                    if (card.classList.contains(collab)) {
                        card.classList.add("selected");
                    }
                });
            } else {
                cards.forEach(function (card) {
                    if (card.classList.contains(collab)) {
                        card.classList.remove("selected");
                    }
                });
            }
            updateSelectedProvidersList();
            checkStep3Visibility();
        });
    });

    // Toggle selected class if access checkbox is clicked and if the checkbox is not checked then remove selected class
    accessCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("click", function () {
            var access = checkbox.classList[1];
            if (checkbox.checked) {
                cards.forEach(function (card) {
                    if (card.classList.contains(access)) {
                        card.classList.add("selected");
                    }
                });
            } else {
                cards.forEach(function (card) {
                    if (card.classList.contains(access)) {
                        card.classList.remove("selected");
                    }
                });
            }
            updateSelectedProvidersList();
            checkStep3Visibility();
        });
    });

    // Toggle selected class if data storage checkbox is clicked and if the checkbox is not checked then remove selected class
    dataStorageCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("click", function () {
            var dataStorage = checkbox.classList[1];
            if (checkbox.checked) {
                cards.forEach(function (card) {
                    if (card.classList.contains(dataStorage)) {
                        card.classList.add("selected");
                    }
                });
            } else {
                cards.forEach(function (card) {
                    if (card.classList.contains(dataStorage)) {
                        card.classList.remove("selected");
                    }
                });
            }
            updateSelectedProvidersList();
            checkStep3Visibility();
        });
    });
});