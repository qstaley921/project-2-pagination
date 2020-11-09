/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
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
      listHTML += 
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
   studentListElement.innerHTML = listHTML; // puts the generated list-item HTML into the student list element
   studentItemsArray = studentListElement.querySelectorAll('li'); // puts an array of the list-items into `studentItems`
}

/////////////////////////////////// Generate Search Bar 

const headerElement = document.querySelector('header');
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
   return headerElement.querySelector('input');
}

////////////////////////////////// Generate Buttons

const buttonListElement = document.querySelector('.link-list');

function generateButtons(itemList) {
   let buttonHTML = '';
   let visibleItems = []; 
   for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].style.display !== 'none') {
         visibleItems.push(itemList[i]);
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
   buttonListElement.innerHTML = buttonHTML;
   activateButton(visibleItems, activeButton);
}

//////////////////////////////////// Generate Page

function generatePage(visibleItems, activeButton) {
   for (let i = 0; i < visibleItems.length; i++) {
      visibleItems[i].style.display = 'none';
   }
   for (let i = (activeButton * 9); i < ((activeButton + 1) * 9); i++ ) {
      if (typeof visibleItems[i] !== 'undefined') {
         visibleItems[i].style.display = '';
      }
   }
}

/**********************************
 * Step 2 - Filter Items 
 **********************************/

function filterItems(itemList, filter) {
   for (let i = 0; i < itemList.length; i++) {
      let item = itemList[i];
      let itemName = (item.querySelector('h3').textContent).toLowerCase(); 
      if (itemName.includes(filter.toLowerCase())) {
         item.style.display = '';
      } else {
         item.style.display = 'none';
      }
   }
   generateButtons(itemList);
}

searchInput.addEventListener('input', (e)=> {
   let input = e.target.value;
   filterItems(studentItemsArray, input);
});


/**********************************
 * Step 3 - Activate Button
 **********************************/

let activeButton = 0;

function activateButton(visibleItems, activeButton) { 
   const buttonItems = buttonListElement.querySelectorAll('button');
   for (let i = 0; i < buttonItems.length; i++) {
      buttonItems[i].className = '';
   }
   buttonItems[activeButton].className = 'active';
   generatePage(visibleItems, activeButton);
}

buttonListElement.addEventListener('click', (e) => {
   let buttonInt = parseInt(e.target.textContent);
   activeButton = buttonInt - 1;
   filterItems(studentItemsArray, searchInput.value);
});

/**********************************
 * Step Final - Call Functions
 **********************************/

generateStudentItems(data); //sources data from the `data.js` variable `const data`
filterItems(studentItemsArray, searchInput.value);

