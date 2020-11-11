

///////////// Global Variables //////////////////
const searchBar = genSearchBar(); // hoisted from below
let searchValue = searchBar.value; 
const buttonList = document.querySelector('.link-list');
let aBtn = 1; // as in Active Button; matches button's innerText, not index
const students = data;

/**********************************************
 * *********************************************
 * STEP 0: Functions which GENERATE (gen) the components
 *          - genSearchBar()
 *          - genItem(i, studentName)
 *          - genButton(i)
 *          - genNoResults()
 *          - genChild(parent, child, property, value,...)
 * *********************************************
 **********************************************/

function genSearchBar() {
  genChild('header', 'label', 'htmlFor', 'search', 'className', 'student-search');
  genChild('header label', 'input', 'id', 'search', 'placeholder', 'Search by name...');
  genChild('header label', 'button', 'type', 'button');
  genChild('header label button', 'img', 'src', 'img/icn-search.svg', 'alt', 'Search icon');

  return document.querySelector('header input');
};

function genItem(i, studentName) { // where `i` = index of item 
  genChild('.student-list', 'li', 'className', 'student-item cf');
  genChild('.student-list li:last-child', 'div', 'className', 'student-details');
  genChild('.student-list li:last-child .student-details', 'img', 'className', 'avatar', 'src', `${students[i].picture.large}`, 'alt', 'Profile Picture');
  genChild('.student-list li:last-child .student-details', 'h3', 'innerText', `${studentName}`);
  genChild('.student-list li:last-child .student-details', 'span', 'className', 'email', 'innerText', `${students[i].email}`);
  genChild('.student-list li:last-child', 'div', 'className', 'joined-details');
  genChild('.student-list li:last-child .joined-details', 'span', 'className', 'date', 'innerText', `Joined ${students[i].registered.date}`);
}

function genButton(i) { // where `i` = index of button
  genChild('.link-list', 'li');
  genChild('.link-list li:last-child', 'button', 'type', 'button', 'className', '', 'innerText', `${i + 1}`);
}

function genNoResults() {
  genChild('.student-list', 'h3', 'innerText', 'No results found :(', 'className', 'no-results');
}

function genChild(parent, child, prop1, val1, prop2, val2, prop3, val3) {
  const childElement = document.createElement(child);
  const parentElement = document.querySelector(parent);
  if (typeof prop1 !== 'undefined') {
    childElement[prop1] = val1;
  }  
  if (typeof prop2 !== 'undefined') {
    childElement[prop2] = val2;
  }  
  if (typeof prop3 !== 'undefined') {
    childElement[prop3] = val3;
  } 
  parentElement.appendChild(childElement);
}

/**********************************************
 * *********************************************
 * STEP 1: Functions which POPULATE (pop) the Generated Components  
 *          - popPage();
 *          - popButtons(population);
 * *********************************************
 **********************************************/

function popPage() {
  const pageListElement = document.querySelector('.student-list');
  let filtered = 0 // where nothing starts filtered because the search bar is empty
  pageListElement.innerHTML = ''; // resets the page
  for (let i = 0; i < students.length; i++) {
    let studentName = `${students[i].name.first} ${students[i].name.last}`;
    let testName = studentName.toLowerCase();
    if (testName.includes(searchValue.toLowerCase()) === false) { // if name != search bar value
      filtered += 1; // item is considered filtered
    }
    if (testName.includes(searchValue.toLowerCase())) { // if name === search bar value
      if ( (i - filtered) < (aBtn * 9) && (Math.abs(i-filtered)) >= ((aBtn -1) * 9) ) { // guarantees only 9 items are ever printed
        genItem(i, studentName);
      } 
    }
  }
  if (filtered+1 > students.length) {
    genNoResults();
    popButtons(filtered);
  } 
  popButtons(filtered);
}

function popButtons(filtered) {
  const buttonListElement = document.querySelector('.link-list');
  buttonListElement.innerHTML = ''; // resets the buttons
  if (students.length > filtered) { // if at least one student exists 
    for (let i = 0; i < ((students.length - filtered) / 9); i++) { // runs for each set of 9 students
      genButton(i);
    }
    btnArray = document.querySelectorAll('.link-list button');
    btnArray[(aBtn - 1)].className = 'active';
  }
}

/**********************************************
 * *********************************************
 * STEP 2: Listener Events to trigger popFunctions() 
 *          - searchBar.addEventListener()
 *          - popButtons();
 * *********************************************
 **********************************************/

searchBar.addEventListener('input', (e) => {
  searchValue = e.target.value;
  aBtn = 1;
  popPage();
});

buttonList.addEventListener('click', (e) => {
  aBtn = parseInt(e.target.textContent);
  popPage();
});

 /**********************************************
 * *********************************************
 * STEP 3: Initial Call
 *          - popPage();
 * *********************************************
 **********************************************/
popPage();