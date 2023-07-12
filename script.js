var softwareData = [
    {
        Name: "Software A",
        Description: "This is software A description",
        risk: "high",
        type: "backup",
        collab: "public",
        access: "mobile",
        dataStorage: "under100GB"
    },
    {
        Name: "Software B",
        Description: "This is software B description",
        risk: "medium",
        type: "backup",
        collab: "otherUBCresearchers",
        access: "laptop",
        dataStorage: "100GBto1TB"
    },
    {
        Name: "Software C",
        Description: "This is software C description",
        risk: "low",
        type: "activeresearch",
        collab: "public",
        access: "laptop",
        dataStorage: "1TBto5TB"
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

function onlyOneRisk(checkbox) {
    var checkboxes = document.querySelectorAll('.risk')
    checkboxes.forEach((item) => {
        // Update the checked state of the other checkboxes and change the selected class of the cards based on the checked state
        if (item !== checkbox) {
            item.checked = false;
        }
    })
}

function onlyOneDataStorage(checkbox) {
    var checkboxes = document.querySelectorAll('.dataStorage')
    checkboxes.forEach((item) => {
        // Update the checked state of the other checkboxes and change the selected class of the cards based on the checked state
        if (item !== checkbox) {
            item.checked = false;
        }
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
    var dataStorageCheckboxes = document.querySelectorAll('.dataStorage');

    function checkIfAllCheckboxesAreUnchecked() {
        var allUnchecked = true;
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                allUnchecked = false;
            }
        });
        return allUnchecked;
    }

    function toggleCardSelection() {
        if (this.classList.contains("filtered") || checkIfAllCheckboxesAreUnchecked()) {
            this.classList.toggle("selected");
        }
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
        selectedCards.forEach(function (card) {
            var name = card.innerText.split("\n\n")[0];
            var description = card.innerText.split("\n\n")[1];
            var descriptionElement = document.createElement("p");
            descriptionElement.textContent = description;
            selectedProvidersList.appendChild(descriptionElement);
        });
    }

    function checkAllFalse(list) {
        return list.every(i => i === false);
    }

    function filterDict(dict) {
        var filterList = [];
        for (var key in dict) {
            if (!checkAllFalse(dict[key])) {
                filterList.push(key);
            }
        }
        return filterList;
    }

    function compareDictsBasedOnFilter(dict1, dict2, filterList, card) {
        var cardRemoved = false;
        for (var key in filterList) {
            if (arrayEquals(dict1[filterList[key]], dict2[filterList[key]]) && !cardRemoved) {
                card.classList.add("filtered");
            } else {
                card.classList.remove("filtered");
                card.classList.remove("selected");
                cardRemoved = true;
            }
        }
        if (filterList.length == 0) {
            card.classList.remove("filtered");
        }
    }

    function arrayEquals(arr1, arr2) {
        // Check if the arrays have the same length
        if (arr1.length !== arr2.length) {
            return false;
        }

        // Compare each element of the arrays
        return arr1.every((value, index) => value === arr2[index]);
    }

    function createCheckBoxBoolDict() {
        var checkBoxBoolDict = {
            risk: [],
            type: [],
            collab: [],
            access: [],
            dataStorage: []
        };
        riskCheckboxes.forEach(function (checkbox) {
            checkBoxBoolDict.risk.push(checkbox.checked);
        });
        typeCheckboxes.forEach(function (checkbox) {
            checkBoxBoolDict.type.push(checkbox.checked);
        });
        collabCheckboxes.forEach(function (checkbox) {
            checkBoxBoolDict.collab.push(checkbox.checked);
        });
        accessCheckboxes.forEach(function (checkbox) {
            checkBoxBoolDict.access.push(checkbox.checked);
        });
        dataStorageCheckboxes.forEach(function (checkbox) {
            checkBoxBoolDict.dataStorage.push(checkbox.checked);
        });
        return checkBoxBoolDict;
    }

    function createCardCheckBoxDict(card) {
        var riskCheckBoxList = [];
        var typeCheckBoxList = [];
        var collabCheckBoxList = [];
        var accessCheckBoxList = [];
        var dataStorageCheckBoxList = [];
        var cardRisk = card.classList[1];
        var cardType = card.classList[2];
        var cardCollab = card.classList[3];
        var cardAccess = card.classList[4];
        var cardDataStorage = card.classList[5];
        var cardCheckBoxDict = {
            risk: [],
            type: [],
            collab: [],
            access: [],
            dataStorage: []
        };
        if (cardRisk === "high") {
            riskCheckBoxList.push(false);
            riskCheckBoxList.push(false);
            riskCheckBoxList.push(true);
        } if (cardRisk === "medium") {
            riskCheckBoxList.push(false);
            riskCheckBoxList.push(true);
            riskCheckBoxList.push(false);
        } else {
            riskCheckBoxList.push(true);
            riskCheckBoxList.push(false);
            riskCheckBoxList.push(false);
        }

        if (cardType === "activeresearch") {
            typeCheckBoxList.push(true);
        } else {
            typeCheckBoxList.push(false);
        }

        if (cardType === "backup") {
            typeCheckBoxList.push(true);
        } else {
            typeCheckBoxList.push(false);
        }

        if (cardType === "archival&opendatasharing") {
            typeCheckBoxList.push(true);
        } else {
            typeCheckBoxList.push(false);
        }

        if (cardCollab === "otherUBCresearchers") {
            collabCheckBoxList.push(true);
        } else {
            collabCheckBoxList.push(false);
        }

        if (cardCollab === "specific") {
            collabCheckBoxList.push(true);
        } else {
            collabCheckBoxList.push(false);
        }

        if (cardCollab === "nonspecific") {
            collabCheckBoxList.push(true);
        } else {
            collabCheckBoxList.push(false);
        }

        if (cardCollab === "public") {
            collabCheckBoxList.push(true);
        } else {
            collabCheckBoxList.push(false);
        }

        if (cardAccess === "laptop") {
            accessCheckBoxList.push(true);
        } else {
            accessCheckBoxList.push(false);
        }

        if (cardAccess === "mobile") {
            accessCheckBoxList.push(true);
        } else {
            accessCheckBoxList.push(false);
        }

        if (cardDataStorage === "under100") {
            dataStorageCheckBoxList.push(true);
            dataStorageCheckBoxList.push(false);
            dataStorageCheckBoxList.push(false);
            dataStorageCheckBoxList.push(false);
        } else if (cardDataStorage === "100GBto1TB") {
            dataStorageCheckBoxList.push(false);
            dataStorageCheckBoxList.push(true);
            dataStorageCheckBoxList.push(false);
            dataStorageCheckBoxList.push(false);
        } else if (cardDataStorage === "1TBto5TB") {
            dataStorageCheckBoxList.push(false);
            dataStorageCheckBoxList.push(false);
            dataStorageCheckBoxList.push(true);
            dataStorageCheckBoxList.push(false);
        } else {
            dataStorageCheckBoxList.push(false);
            dataStorageCheckBoxList.push(false);
            dataStorageCheckBoxList.push(false);
            dataStorageCheckBoxList.push(true);
        }

        cardCheckBoxDict = {
            risk: riskCheckBoxList.slice(0, 3),
            type: typeCheckBoxList,
            collab: collabCheckBoxList,
            access: accessCheckBoxList,
            dataStorage: dataStorageCheckBoxList
        };

        return cardCheckBoxDict;
    }

    function toggleCardSelectionBasedOnCheckBoxes() {
        var checkBoxBoolDict = createCheckBoxBoolDict();
        cards.forEach(function (card) {
            var cardCheckboxList = createCardCheckBoxDict(card);
            compareDictsBasedOnFilter(cardCheckboxList, checkBoxBoolDict, filterDict(checkBoxBoolDict), card);
        });
    }
    step2SelectAllButton.addEventListener("click", function () {
        cards.forEach(function (card) {
            if (card.classList.contains("filtered") || checkIfAllCheckboxesAreUnchecked()) {
                card.classList.add("selected");
            }
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
        cards.forEach(function (card) {
            card.classList.remove("selected");
            card.classList.remove("filtered");
        });
        updateSelectedProvidersList();
        checkStep3Visibility();
    });

    cards.forEach(function (card) {
        card.addEventListener("click", toggleCardSelection);
    });

    // Implement point 5 from the requirements
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("click", function () {
            toggleCardSelectionBasedOnCheckBoxes();
        });
    });
});

/* 
Requirements:

1. Can select filtered cards independently
2. If filter changes and a card is no longer filtered, it should be unselected
3. If any card selected, show step 3 with the info about card
4. If no cards selected, hide step 3
5. All the conditions are in an AND relationship
*/