let checkboxClasses = [
    "purpose REB-approved",
    "purpose QI-QA",
    "purpose admin-operations-support",
    "purpose non-human-research",
    "type qualitative",
    "type quantitative",
    "type mixed-methods",
    "collection surveys",
    "collection direct-data-entry",
    "collection interview-focus-groups",
    "collection import",
    "source biospecimen",
    "source lab-slides",
    "source image-videos",
    "source genomics",
    "source literature-reviews",
    "source other-data-sources"
];

let questionClasses = ["purpose", "type", "collection", "source"];

let softwareData = [
    {
        purpose: ["REB-approved", "QI-QA"],
        type: ["qualitative", "quantitative"],
        collection: ["surveys", "direct-data-entry", "interview-focus-groups", "import"],
        source: ["genomics", "other-data-sources"],
        Name: "RedCap",
        Description: "RedCap Description"
    },
    {
        purpose: ["admin-operations-support"],
        type: ["quantitative"],
        collection: ["surveys", "import"],
        source: ["image-videos", "other-data-sources"],
        Name: "Qualtrics",
        Description: "Qualtrics Description"
    }
    // Add more data objects as needed
];

// Dynamically compute the number of questions based on the data object
function computeNumQuestions() {
    let questionsDiv = document.querySelector('.questions');
    let questions = questionsDiv.querySelectorAll('.question');
    let numQuestions = questions.length;
    return numQuestions;
}

let numQuestions = computeNumQuestions();

// Generate card-like structures dynamically using the data object
function generateCards() {
    let cardsContainer = document.querySelector('.cards-container');
    softwareData.forEach(function (software) {
        let card = document.createElement('div');
        card.classList.add('card');
        count = 0;
        for (let key in software) {
            if (count >= numQuestions) {
                break;
            }
            for (let i = 0; i < software[key].length; i++) {
                card.classList.add(software[key][i]);
            }
            count++;
        }

        let nameElement = document.createElement('h4');
        nameElement.textContent = software.Name;

        let descriptionElement = document.createElement('p');
        descriptionElement.textContent = software.Description;

        card.appendChild(nameElement);
        card.appendChild(descriptionElement);
        cardsContainer.appendChild(card);
    });
}

generateCards();

function onlyOne(checkbox, className) {
    let checkboxes = document.querySelectorAll('.' + className)
    checkboxes.forEach((item) => {
        // Update the checked state of the other checkboxes and change the selected class of the cards based on the checked state
        if (item !== checkbox) {
            item.checked = false;
        }
    })
}

function makePropertiesList(inputArray) {
    function makeReadable(inputString) {
      // Split the string into an array of words based on the '-' delimiter
      const wordsArray = inputString.split('-');
  
      // Capitalize the first letter of each word
      const capitalizedWordsArray = wordsArray.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
      // Join the words back together with spaces between them
      return capitalizedWordsArray.join(' ');
    }
  
    const readableArray = inputArray.map(makeReadable);
  
    return readableArray.join(', ');
  }


let cards = document.querySelectorAll(".card");
let infoIfSelected = document.querySelector(".info-if-selected");
let selectedProvidersList = document.querySelector(".selected-data-storage-providers-list");
let step2SelectAllButton = document.querySelector(".step2-select-all");
let step2ClearAnswersButton = document.querySelector(".step2-clear-selections");
let clearAnswersButton = document.querySelector(".clear-answers");
let checkboxes = document.querySelectorAll('input[type="checkbox"]');

cards.forEach(function (card) {
    card.addEventListener("click", toggleCardSelection);
});

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("click", function () {
        toggleCardSelectionBasedOnCheckBoxes();
    });
});

step2SelectAllButton.addEventListener("click", function () {
    cards.forEach(function (card) {
        if (card.classList.contains("filtered") || checkIfAllCheckboxesAreUnchecked()) {
            card.classList.add("selected");
        } else {
            card.classList.remove("selected");
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
        card.classList.remove("filtered");
    });
    updateSelectedProvidersList();
    checkStep3Visibility();
});

/**
 * The function toggles the selection of cards based on the state of checkboxes and updates the
 * selected providers list and step 3 visibility.
 */
function toggleCardSelectionBasedOnCheckBoxes() {
    let checkBoxBoolDict = createCheckBoxBoolDict(questionClasses);
    cards.forEach(function (card) {
        let cardCheckBoxDict = createCardCheckBoxDict(card, checkboxClasses);
        compareDictsBasedOnFilter(cardCheckBoxDict, checkBoxBoolDict, filterDict(checkBoxBoolDict), card);
    });
    updateSelectedProvidersList();
    checkStep3Visibility();
}

/**
 * The function creates a dictionary where the keys are class names and the values are arrays of
 * boolean values indicating whether the corresponding checkboxes are checked or not.
 * @param questionClasses - questionClasses is an array of strings representing the classes of the
 * questions. Each string in the array should be in the format "questionClass checkboxClass", where
 * "questionClass" is the class name of the question and "checkboxClass" is the class name of the
 * checkboxes associated with that question.
 * @returns a dictionary object where the keys are the first elements of the strings in the
 * `questionClasses` array, and the values are arrays of boolean values indicating whether the
 * corresponding checkboxes with the same name are checked or not.
 */
function createCheckBoxBoolDict(questionClasses) {
    let checkBoxBoolDict = {};
    questionClasses.forEach(function (questionClass) {
        let classListString = questionClass.split(" ");
        checkBoxBoolDict[classListString[0]] = [];
        let checkboxes = document.querySelectorAll('input[name="' + classListString[0] + '"');
        checkboxes.forEach(function (checkbox) {
            checkBoxBoolDict[classListString[0]].push(checkbox.checked);
        });
    });
    return checkBoxBoolDict;
}

/**
 * The function creates a dictionary mapping checkbox classes to their corresponding values for a
 * given card element.
 * @param card - The `card` parameter is an HTML element representing a card.
 * @param checkboxClasses - An array of strings representing the classes of checkboxes.
 * @returns a dictionary (checkBoxDict) that contains the checkbox classes as keys and an array of
 * boolean values as values.
 */
function createCardCheckBoxDict(card, checkboxClasses) {
    let checkBoxDict = {};

    checkboxClasses.forEach(function (checkboxClass) {
        let classListString = checkboxClass.split(" ");
        let classValue = card.classList.contains(classListString[1]);
        if (!(classListString[0] in checkBoxDict)) {
            checkBoxDict[classListString[0]] = [];
        }
        checkBoxDict[classListString[0]].push(classValue);
    });

    return checkBoxDict;
}

/**
 * The function compares two dictionaries based on a filter list and modifies a card element
 * accordingly.
 * @param dict1 - The first dictionary to compare.
 * @param dict2 - dict2 is a dictionary object containing key-value pairs.
 * @param filterList - The filterList parameter is an array that contains the keys of the
 * properties in the dictionaries that you want to compare.
 * @param card - The `card` parameter is a reference to an HTML element that represents a card or
 * item in a list.
 */
function compareDictsBasedOnFilter(dict1, dict2, filterList, card) {
    let cardRemoved = false;
    for (let key in filterList) {
        if (implies(dict2[filterList[key]], dict1[filterList[key]]) && !cardRemoved) {
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

/**
 * The function checks if all checkboxes are unchecked.
 * @returns a boolean value indicating whether all checkboxes are unchecked.
 */
function checkIfAllCheckboxesAreUnchecked() {
    let allUnchecked = true;
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            allUnchecked = false;
        }
    });
    return allUnchecked;
}

/**
 * The function toggles the "selected" class on a card element if it is not filtered or if all
 * checkboxes are unchecked, and then updates the visibility of step 3 and the selected providers
 * list.
 */
function toggleCardSelection() {
    if (this.classList.contains("filtered") || checkIfAllCheckboxesAreUnchecked()) {
        this.classList.toggle("selected");
    }
    checkStep3Visibility();
    updateSelectedProvidersList();
}

/**
 * The function checks if any cards are selected and changes display property 
 * of step 3 to block from none and vice-versa.
 */
function checkStep3Visibility() {
    let selectedCards = document.querySelectorAll(".card.selected");
    infoIfSelected.style.display = selectedCards.length > 0 ? "block" : "none";
}

function updateSelectedProvidersList() {
    selectedProvidersList.innerHTML = ""; // Clear the previous content

    let selectedCards = document.querySelectorAll(".card.selected");

    let tableHTML = `
    <div class="table-container">
        <table class="list">
            <thead>
                <tr>
                    <th></th>`; // Empty first header column

    selectedCards.forEach(function (card) {
        let name = card.querySelector("h4").textContent;
        tableHTML += `<th>${name}</th>`; // Add software names as header columns
    });

    tableHTML += `
                </tr>
            </thead>
            <tbody>`;

    tableHTML += `
        <tr>
            <td><b>Description</b></td>`; // Add row for descriptions

    selectedCards.forEach(function (card) {
        let name = card.querySelector("h4").textContent;

        softwareData.forEach(function (data) {
            if (data.Name === name) {
                let description = data.Description;
                tableHTML += `<td>${description}</td>`; // Add software-specific description as table cell
            }
        });
    });

    questionClasses.forEach(function (questionClass) {
        tableHTML += "<tr>";
        let question = questionClass.charAt(0).toUpperCase() + questionClass.slice(1)
        tableHTML += `<td><b>${question}</b></td>`; // First column represents the question

        selectedCards.forEach(function (card) {
            let name = card.querySelector("h4").textContent;

            softwareData.forEach(function (data) {
                if (data.Name === name) {
                    let answer = data[questionClass] ? data[questionClass] : "";
                    answer = makePropertiesList(answer)
                    tableHTML += `<td>${answer}</td>`; // Add software-specific answer as table cell
                }
            });
        });

        tableHTML += "</tr>";
    });

    tableHTML += `
            </tbody>
        </table>
    </div>`;

    selectedProvidersList.innerHTML = tableHTML;
}



/**
 * The function filterDict filters a dictionary by checking if any of its values are not false.
 * @param dict - The parameter `dict` is expected to be an object (dictionary) containing key-value
 * pairs.
 * @returns a list of keys from the input dictionary that have at least one value that is not
 * false.
 */
function filterDict(dict) {
    let filterList = [];
    for (let key in dict) {
        if (!checkAllFalse(dict[key])) {
            filterList.push(key);
        }
    }
    return filterList;
}

/**
 * The function checks if all elements in a given list are false.
 * @param list - An array of values to check.
 * @returns a boolean value. It will return true if every element in the list is false, and false
 * otherwise.
 */
function checkAllFalse(list) {
    return list.every(i => i === false);
}

/**
 * The function "implies" checks if every element in list1 implies the corresponding element in
 * list2.
 * @param list1 - An array of boolean values.
 * @param list2 - The parameter "list2" is expected to be an array.
 * @returns a boolean value. It returns true if all elements in list1 imply the corresponding
 * elements in list2, and false otherwise.
 */
function implies(list1, list2) {
    for (let i = 0; i < list1.length; i++) {
        if (list1[i] && !list2[i]) {
            return false;
        }
    }
    return true;
};

/* 
Requirements:

1. Can select filtered cards independently
2. If filter changes and a card is no longer filtered, it should be unselected
3. If any card selected, show step 3 with the info about card
4. If no cards selected, hide step 3
5. All the conditions are in an AND relationship
*/