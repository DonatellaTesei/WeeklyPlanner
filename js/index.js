//main element in html where the cards will be printed
const wrap = document.getElementById("result");
//sort button
const sortBtn = document.getElementById("sort");


// JSON.parse() is used to create an array of objects from the data in json format (string)
const mydata = JSON.parse(tasks);
// console.log(mydata);


//function to create the html
//a loop is used to print all the objects
//card
function createHTML() {
    const sortedData = createSortedData();
    wrap.innerHTML = "";
    for (let i = 0; i < sortedData.length; i++) {
        wrap.innerHTML += `
        <div>
    <div class= "card shadow p-2 mb-5 bg-body-tertiary rounded h-95 mx-auto" style="width: 19rem;" >
    <a href= "${mydata[i].link}" class="btn btn-dark btn-sm" style="width:40%;"><b>${mydata[i].taskName}</b></a>
    <img src="${mydata[i].image}" class="img-thumbnail mt-2" alt="${mydata[i].taskName}" style="height:16rem;" id="card-image">
    <div class="card-body">
      <h5 class="card-description text-center" id="description"> <b>${mydata[i].description}</b></h5>

      <h6 class="card-title mt-4"> <b>Location:</b> ${mydata[i].location}</h6>
      <p class="duration"><b>Duration</b>: ${mydata[i].duration}</p> <hr>
<div class="cont">
   <span><button class="btn btn-outline-dark btn-sm priorityBtn"><i class="bi bi-exclamation-triangle-fill"></i></button></span> <span><p class="text"><b>Priority level:</b></p></span>
   <span><button type="button" class="btn priority ${getPriorityClass(mydata[i].importance)}" id="btn-green">${mydata[i].importance}</button></span>

   </div>
      <p class="deadline"><b> When:</b> ${mydata[i].deadline}, ${mydata[i].time}</p><hr>

      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button class="btn btn-outline-danger delete"><i class="bi bi-trash3"></i></button>
     <button class="btn btn-outline-success done"><i class="bi bi-check-circle"></i></button>
     </div>
    </div>
    </div>
    </div>
   `;
    }
    //card

    //the priority button increases the task priority and assignes it a color
    const btns = document.getElementsByClassName("priorityBtn");

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            mydata[i].importance++;

            // the priority level is limited to max 5, after which the count is reset to 0
            if (mydata[i].importance > 5) {
                mydata[i].importance = 0;
            }

            if (mydata[i].importance == 0 && mydata[i].importance <= 1) {
                document.getElementsByClassName("priority")[i].classList.remove("btn-danger");
                document.getElementsByClassName("priority")[i].classList.add("btn-success");

            } else
            if (mydata[i].importance >= 2 && mydata[i].importance <= 3) {
                document.getElementsByClassName("priority")[i].classList.remove("btn-success");

                document.getElementsByClassName("priority")[i].classList.add("btn-warning");
            } else if (mydata[i].importance >= 4 && mydata[i].importance <= 5) {
                document.getElementsByClassName("priority")[i].classList.remove("btn-warning");

                document.getElementsByClassName("priority")[i].classList.add("btn-danger");
            }
            // prints the new amount of likes to the innerHTML of our btn
            document.getElementsByClassName("priority")[i].innerHTML = mydata[i].importance;
        });
    }


    //sort button to arrange the tasks based on their priority
    sortBtn.addEventListener("click", function() {
        mydata.sort((a, b) => b.importance - a.importance);
        // console.log(data);
        //calls the createHTML function to redraw the sorted array
        createHTML();
    })

    // the getPriorityClass() function is used to get the class for the priority button based on the priority value. The function is called in the card, priority button, (line 31).
    function getPriorityClass(priority) {
        if (priority == 0 || priority == 1) {
            return 'btn-success';
        } else if (priority >= 2 && priority <= 3) {
            return 'btn-warning';
        } else if (priority >= 4 && priority <= 5) {
            return 'btn-danger';
        }
    }

    //this function isd added to make sure that the createHTML() function updates the class of the priority button based on the priority value of each task, even after sorting the cards.
    function createSortedData() {
        const sortedData = mydata.slice().sort((a, b) => {
            if (a.importance == b.importance) {
                return 0;
            } else if (a.importance < b.importance) {
                return 1;
            } else {
                return -1;
            }
        });
        return sortedData;
    }

    //when clicking the delete button, a task (card) will be hidden
    const deletes = document.getElementsByClassName("delete");
    for (let i = 0; i < deletes.length; i++) {

        deletes[i].addEventListener("click", function() {
            mydata.splice(i, 1);
            this.parentNode.parentNode.parentNode.style.display = "none";
        });
    };


    //when clicking the done button (checkmark), a card will become inactive
    //to undo click somewhere else on the card 
    const doneButtons = document.querySelectorAll('.done');

    for (let i = 0; i < doneButtons.length; i++) {
        doneButtons[i].addEventListener('click', function(event) {
            let card = event.target.closest('.card');
            //adds new classes that can be used to style the cart as inactive
            card.classList.add('completed', 'undo');
        });
    }

    const cards = document.querySelectorAll('.card');

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function(event) {
            if (event.target.classList.contains('done') || event.target.closest('.done')) {
                return; // don't toggle if clicking on the done button
            }
            const card = event.target.closest('.card');
            if (card.classList.contains('undo')) {
                card.classList.remove('completed', 'undo');
            }
        });
    };



}

// call the function to draw the initial html, 
// this only runs once when the page is refreshed
createHTML();


//------------------------scroll-to-top button element----------------------------
const button = document.getElementById("scrollToTop");

// hides the button initially
button.style.display = "none";

// shows/hides the button as the user scrolls
window.onscroll = function() {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 450,
        behavior: 'smooth'
    });

}
//------------------------scroll-to-top button element----------------------------

//-------------------------------bell movement navbar-----------------------------

const bell = document.getElementById("bell");

bell.addEventListener("mouseenter", function() {
    bell.style.top = "-50px";
});

bell.addEventListener("mouseleave", function() {
    bell.style.top = "0";
});
//-------------------------------bell movement navbar-----------------------------