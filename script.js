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

// TODO: Ask about functionality of the checkboxes and highlighting

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
    var dataStorageCheckboxes = document.querySelectorAll('.data-storage');

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
        selectedCards.forEach(function (card) {
            var name = card.innerText.split("\n\n")[0];
            var description = card.innerText.split("\n\n")[1];
            var descriptionElement = document.createElement("p");
            descriptionElement.textContent = description;
            selectedProvidersList.appendChild(descriptionElement);
        });
    }

    function arraysEqual(arr1, arr2) {
        // Check if the arrays have the same length
        if (arr1.length !== arr2.length) {
            return false;
        }

        // Compare each element of the arrays
        return arr1.every((value, index) => value === arr2[index]);
    }

    // TODO: Create allFalse parameters to check if all the chekboxes for that question are false, if yes then ignore that question
    function createCardCheckBoxList(card) {
        var cardCheckBoxList = [];
        var cardRisk = card.classList[1];
        var cardType = card.classList[2];
        var cardCollab = card.classList[3];
        var cardAccess = card.classList[4];
        var cardDataStorage = card.classList[5];
        if (cardRisk === "high") {
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(true);
        } if (cardRisk === "medium") {
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(true);
            cardCheckBoxList.push(false);
        } else {
            cardCheckBoxList.push(true);
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(false);
        }

        if (cardType === "activeresearch") {
            cardCheckBoxList.push(true);
        } else {
            cardCheckBoxList.push(false);
        }

        if (cardType === "backup") {
            cardCheckBoxList.push(true);
        } else {
            cardCheckBoxList.push(false);
        }

        if (cardType === "archival&opendatasharing") {
            cardCheckBoxList.push(true);
        } else {
            cardCheckBoxList.push(false);
        }

        if (cardCollab === "otherUBCresearchers") {
            cardCheckBoxList.push(true);
        } else {
            cardCheckBoxList.push(false);
        }

        if (cardCollab === "specific") {
            cardCheckBoxList.push(true);
        } else {
            cardCheckBoxList.push(false);
        }

        if (cardCollab === "nonspecific") {
            cardCheckBoxList.push(true);
        } else {
            cardCheckBoxList.push(false);
        }

        if (cardCollab === "public") {
            cardCheckBoxList.push(true);
        } else {
            cardCheckBoxList.push(false);
        }

        if (cardAccess === "laptop") {
            cardCheckBoxList.push(true);
        } else {
            cardCheckBoxList.push(false);
        }

        if (cardAccess === "mobile") {
            cardCheckBoxList.push(true);
        } else {
            cardCheckBoxList.push(false);
        }

        if (cardDataStorage === "under100") {
            cardCheckBoxList.push(true);
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(false);
        } else if (cardDataStorage === "100GBto1TB") {
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(true);
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(false);
        } else if (cardDataStorage === "1TBto5TB") {
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(true);
            cardCheckBoxList.push(false);
        } else {
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(false);
            cardCheckBoxList.push(true);
        }

        return cardCheckBoxList;
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

    // // Toggle selected class if risk checkbox is clicked and if the checkbox is not checked then remove selected class
    // riskCheckboxes.forEach(function (checkbox) {
    //     checkbox.addEventListener("click", function () {
    //         var risk = checkbox.classList[1];
    //         if (checkbox.checked) {
    //             cards.forEach(function (card) {
    //                 if (card.classList.contains(risk)) {
    //                     card.classList.add("selected");
    //                 }
    //             });
    //         } else {
    //             cards.forEach(function (card) {
    //                 if (card.classList.contains(risk)) {
    //                     card.classList.remove("selected");
    //                 }
    //             });
    //         }
    //         updateSelectedProvidersList();
    //         checkStep3Visibility();
    //     });
    // });

    // // Toggle selected class if type checkbox is clicked and if the checkbox is not checked then remove selected class
    // typeCheckboxes.forEach(function (checkbox) {
    //     checkbox.addEventListener("click", function () {
    //         var type = checkbox.classList[1];
    //         if (checkbox.checked) {
    //             cards.forEach(function (card) {
    //                 if (card.classList.contains(type)) {
    //                     card.classList.add("selected");
    //                 }
    //             });
    //         } else {
    //             cards.forEach(function (card) {
    //                 if (card.classList.contains(type)) {
    //                     card.classList.remove("selected");
    //                 }
    //             });
    //         }
    //         updateSelectedProvidersList();
    //         checkStep3Visibility();
    //     });
    // });

    // // Toggle selected class if collab checkbox is clicked and if the checkbox is not checked then remove selected class
    // collabCheckboxes.forEach(function (checkbox) {
    //     checkbox.addEventListener("click", function () {
    //         var collab = checkbox.classList[1];
    //         if (checkbox.checked) {
    //             cards.forEach(function (card) {
    //                 if (card.classList.contains(collab)) {
    //                     card.classList.add("selected");
    //                 }
    //             });
    //         } else {
    //             cards.forEach(function (card) {
    //                 if (card.classList.contains(collab)) {
    //                     card.classList.remove("selected");
    //                 }
    //             });
    //         }
    //         updateSelectedProvidersList();
    //         checkStep3Visibility();
    //     });
    // });

    // // Toggle selected class if access checkbox is clicked and if the checkbox is not checked then remove selected class
    // accessCheckboxes.forEach(function (checkbox) {
    //     checkbox.addEventListener("click", function () {
    //         var access = checkbox.classList[1];
    //         if (checkbox.checked) {
    //             cards.forEach(function (card) {
    //                 if (card.classList.contains(access)) {
    //                     card.classList.add("selected");
    //                 }
    //             });
    //         } else {
    //             cards.forEach(function (card) {
    //                 if (card.classList.contains(access)) {
    //                     card.classList.remove("selected");
    //                 }
    //             });
    //         }
    //         updateSelectedProvidersList();
    //         checkStep3Visibility();
    //     });
    // });

    // // Toggle selected class if data storage checkbox is clicked and if the checkbox is not checked then remove selected class
    // dataStorageCheckboxes.forEach(function (checkbox) {
    //     checkbox.addEventListener("click", function () {
    //         var dataStorage = checkbox.classList[1];
    //         if (checkbox.checked) {
    //             cards.forEach(function (card) {
    //                 if (card.classList.contains(dataStorage)) {
    //                     card.classList.add("selected");
    //                 } else {
    //                     if (card.classList.contains("selected")) {
    //                         card.classList.remove("selected");
    //                     }
    //                 }
    //             });
    //         } else {
    //             cards.forEach(function (card) {
    //                 if (card.classList.contains(dataStorage)) {
    //                     card.classList.remove("selected");
    //                 }
    //             });
    //         }
    //         updateSelectedProvidersList();
    //         checkStep3Visibility();
    //     });
    // });

    // Implement point 5 from the requirements
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("click", function () {
            var checkBoxBoolList = [];
            checkboxes.forEach(function (checkbox) {
                checkBoxBoolList.push(checkbox.checked);
            });

            console.log("check: " + checkBoxBoolList);

            cards.forEach(function (card) {
                var cardChecboxList = createCardCheckBoxList(card);
                console.log("card: " + cardChecboxList);

                console.log(checkBoxBoolList);
                if (arraysEqual(checkBoxBoolList, cardChecboxList)) {
                    card.classList.add("selected");
                } else {
                    card.classList.remove("selected");
                }
            });
        });
    });
});

// TODO: Update above functions so that the cards have 3 states: unfiltered, filtered and selected

/* 
Requirements:

1. Can select filtered cards independently
2. If filter changes and a card is no longer filtered, it should be unselected
3. If any card selected, show step 3 with the info about card
4. If no cards selected, hide step 3
5. All the conditions are in an AND relationship
*/