
/// Editor Note ... I didn't realize the array.filter() method existed. 
//              ... This is my convoluted way of evading that method — LOL.
//          AND ... I'm proud of my convoluted method. 
//              ... Otherwise, I realize, filtering the student list before populating the page is better than
//              ... populating the page as the filtering occurs. 
//              ... At least, the former seems more 'modular'. 
//              ... Oh well. Either works. Enjoy. And, thanks for reading. 

///////////// Global Variables //////////////////
const searchBar = genSearchBar(); 
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
 *          - genChild(parent, child, property, value,...) // This 'gens' the other things haha
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

// insertAdjacentHTML would have been faster ... but I'm also proud of my genChild Method. 
// Sometimes pride is a dangerous thing. 
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
 * STEP 1: Functions which POPULATE (pop) the Generated Components above
 *          - popPage();
 *          - popButtons(filtered);
 * *********************************************
 **********************************************/

function popPage() {
  const pageListElement = document.querySelector('.student-list');
  let filtered = 0 // where nothing starts filtered because the search bar is empty
  pageListElement.innerHTML = ''; // resets the page
  for (let i = 0; i < students.length; i++) { // for number of students
    let studentName = `${students[i].name.first} ${students[i].name.last}`;
    let testName = studentName.toLowerCase();
    if (testName.includes(searchValue.toLowerCase()) === false) { // if name != search bar value
      filtered += 1; // item is considered filtered
    }
    if (testName.includes(searchValue.toLowerCase())) { // if name === search bar value
      // I bet you can't guess how the next "If Statement" works – [upsidedown smiley face] 
      // Let's use an example...  "Greg @ index: 40" && "Active Button @ aBtn: 1" && "Filtered Items: 39"
      // so if ((Greg:40) - (39 filtered items)), Greg now = index 1
      // Greg:1 < (aBtn:1 * 9) && Greg:1 > (aBtn:0 * 9) === True. Greg appears on page 1, when 39 items are filtered.
      // if filtered = 0 ... Greg:40 < btn:9 === false, and greg would not be displayed, 
      // if aBtn = 4 ... Greg:40 < aBtn 4*9 && Greg:40 > aBtn(4-1)*9 === True, Greg is displayed when aBtn = 4; 
      // if you don't follow, no worries. This is why I cite my code as 'convoluted' 
      if ( (i - filtered) < (aBtn * 9) && (Math.abs(i-filtered)) >= ((aBtn -1) * 9) ) { // guarantees only 9 items are printed
        genItem(i, studentName);
      } 
    }
  }
  if (filtered+1 > students.length) { // this is what generates the no results message 
    genNoResults();
  } 
  popButtons(filtered); // populates the buttons based on filter results. 
                        // So if 42 - 20 students are filtered, buttons are made for just 22 items
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
popPage(); // loads the page initially ... the event listeners do the rest 