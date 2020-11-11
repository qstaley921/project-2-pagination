/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering

Comments: 

This program runs in the following order: 

Step  1: The Student Items & Search Bar are generated and populated onto the page. 
Step  2: The `filterItems` function runs, and then listens for further changes
Step 3a: `filterItems` runs when `searchInput` receives an `input` 
     3b: `filterItems` calls `generateButtons`
Step 4a: `generateButtons` creates the corresponding number of buttons
     4b: `generateButtons` calls `activateButton`
Step 5a: `activateButton` assigns `active` class to the active button
     5b: `activateButton` calls `generatePage` 
Step  6: `generatePage` displays the correct items

So ... it's a cascading function tree ... I couldn't think of how else to do it; it feels disastrous :o

filterItems => generateButtons => activateButtons => generatePage 

*/






/*********************************** 
 * Step 1 - Generate items
 **********************************/

/////////////////////////////////// Generate Student Items List 

const studentListElement = document.querySelector('.student-list');
let studentItemsArray = [];

function generateStudentItems(data) {
   let listHTML = '';
   for (let i = 0; i < data.length; i++) { 
      listHTML +=  // interpolates the correct data into a LONG HTML String — it feels crude, but it works hehe
      ` 
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${data[i].picture.large}" alt="Profile Picture">
               <h3>${data[i].name.first} ${data[i].name.last}</h3>
               <span class="email">${data[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${data[i].registered.date}</span>
            </div>
         </li>
      `;
   }
   studentListElement.innerHTML = listHTML; // puts the generated HTML into the student list element
   studentItemsArray = studentListElement.querySelectorAll('li'); // puts an array of the list-items into `studentItems`
}

/////////////////////////////////// Generate Search Bar 

const headerElement = document.querySelector('header'); // this is where I'll append the search bar
const searchInput = generateSearchBar(); 

function generateSearchBar() {
   headerElement.innerHTML = 
   `
     <h2>Students</h2>
     <label for="search" class="student-search">
       <input id="search" placeholder="Search by name...">
       <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
     </label>
   `;
   return headerElement.querySelector('input'); // returns the input field after it's generated to be evaluated later
}

/*********************************** 
 * Step 2 - Filter Items
 **********************************/

 let filtering = false; // measures if the input field has been typed into 

function filterItems(itemList, filter) { 
   for (let i = 0; i < itemList.length; i++) { 
      let item = itemList[i];
      let itemName = (item.querySelector('h3').textContent).toLowerCase(); // extracts Student Name
      if (itemName.includes(filter.toLowerCase())) { // tests if filter input === student name
         item.style.display = ''; // if true, display is restored to the studentItem 
         
      } else {
         item.style.display = 'none'; 
      }
   }
   generateButtons(itemList); // generates buttons based on remaining 'visible' studentItems
}

searchInput.addEventListener('input', (e)=> { // this listener calls the filter function after the initial call below
   let input = e.target.value;
   filterItems(studentItemsArray, input);
});

/**********************************
 * Step 3 - Generate Buttons
 **********************************/
const buttonListElement = document.querySelector('.link-list'); // this is where I'll append the buttons 

function generateButtons(itemList) {
   let buttonHTML = '';
   let visibleItems = [];  
   for (let i = 0; i < itemList.length; i++) { // for every studentItem 
      if (itemList[i].style.display !== 'none') { // if item is visible
         visibleItems.push(itemList[i]); // item is added to the `visibleItems` array. i.e. remaining students after the input filter
      }
   }

   for (let i = 0; i < (visibleItems.length / 9); i++) { // generates a button for every nine students
      buttonHTML +=
      `
         <li>
            <button type="button">${i + 1}</button>
         </li>
      `;
   }

   if (visibleItems.length = 1 && filtering) {
      activeButton = 0;
   }
   buttonListElement.innerHTML = buttonHTML;
   activateButton(visibleItems, activeButton); // runs the activate button function (below)
}

/////////////////////////////////////// Activate Button Function

let activeButton = 0; // initializes the first button as active

function activateButton(visibleItems, activeButton) { 
   const buttonItems = buttonListElement.querySelectorAll('button');
   for (let i = 0; i < buttonItems.length; i++) { // resets all button classes to empty
      buttonItems[i].className = '';
   }
   if (typeof buttonItems[activeButton] !== 'undefined') {
      buttonItems[activeButton].className = 'active'; // sets active button to class = 'active' 
   }  
   generatePage(visibleItems, activeButton);  // generates the page based on the 'active' button
}

buttonListElement.addEventListener('click', (e) => { 
   let buttonInt = parseInt(e.target.textContent); // extracts button number from button textContent
   activeButton = buttonInt - 1; 
   filterItems(studentItemsArray, searchInput.value); // runs the chain of functions again
});

/**********************************
 * Step 4 - Generate Page
 **********************************/

function generatePage(visibleItems, activeButton) {
   for (let i = 0; i < visibleItems.length; i++) { // hides all elements
      visibleItems[i].style.display = 'none';
   }
   for (let i = (activeButton * 9); i < ((activeButton + 1) * 9); i++ ) { // reveals elements again based on button number
      if (typeof visibleItems[i] !== 'undefined') { // only runs if visible elements remain
         visibleItems[i].style.display = '';
      }
   }
}

// function errorMessage(visibleItems, status) {
//    const li = document.createElement('li');
//    li.className = 'errorMessage';
//    li.innerText = 'No results found :(';
//    li.display = 'none';
//    studentListElement.appendChild(li);
//    if (status === true) {
//       li.display = '';
//    } else if (status === false) {
//       li.display = 'none';
//    }
// }



/**********************************
 * Step Final - Call Functions
 **********************************/

generateStudentItems(data); //sources data from the `data.js` variable `const data`
filterItems(studentItemsArray, searchInput.value);

