# Data-Storage-Finder

A data storage finder made in Vanilla HTML, CSS and JavaScript.

## How to edit for your Use Case?

- If you want to add or change a question open index.html and navigate to
  ```html
  <div class="question">
  ```
  Figure out if your question should be single-select or multi-select

  Use the following template if **single-select** to add the code
  
  Here ```<text>``` is a one word description of the question

    ```html
    <div class="question">
      <h4>DESCRIPTION</h4>
      <div class="answer">
        <input type="checkbox" name="<text>" class="<text> <answer-in-lowercase-nospaces>" onclick="onlyOne(this, this.classList[0])">Answer<br>
        <input type="checkbox" name="<text>" class="<text> <answer-in-lowercase-nospaces>" onclick="onlyOne(this, this.classList[0])">Answer<br>
        <input type="checkbox" name="<text>" class="<text> <answer-in-lowercase-nospaces>" onclick="onlyOne(this, this.classList[0])">Answer<br>
      </div>
    </div>
    ```
    Use the following template if **multi-select** to add the code
  
    Here ```<text>``` is a one word description of the question
  
      ```html
      <div class="question">
        <h4>DESCRIPTION</h4>
        <div class="answer">
          <input type="checkbox" name="<text>" class="<text> <answer-in-lowercase-nospaces>">Answer<br>
          <input type="checkbox" name="<text>" class="<text> <answer-in-lowercase-nospaces>">Answer<br>
          <input type="checkbox" name="<text>" class="<text> <answer-in-lowercase-nospaces>">Answer<br>
        </div>
      </div>
      ```
  
  Next go to script.js
  
  In ```checkboxClasses``` list add the element in the form: ```"<text> <answer-in-lowercase-nospaces>"``` for every answer
  
  Add the <text> in the ```questionClasses``` variable
  
  Finally for each software in the ```softwareData``` variable add the following ```<text>: software-feature``` 
  
  (Note: software feature should be one of the answers)
  
  **Also, make sure the feature comes before Name variable**

- If you want to add or change a software, go to script.js and go to ```softwareData``` variable.

  Change the variable or add another element

  (Note: Make sure all the elements are in the same format)

Inspiration from: https://github.com/CU-CommunityApps/CD-finder
