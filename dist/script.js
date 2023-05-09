const btn = document.getElementById("btn");
const txtDisplayed = document.querySelector(".txt-container");
const userTxt = document.querySelectorAll(".input-container");
const text = document.querySelectorAll(".text-primary");

// Form inputs
const txtDay = document.getElementById("day");
const txtMonth = document.getElementById("month");
const txtYear = document.getElementById("year");

// Current date
const currentDate = new Date();

// Event Listeners

btn.addEventListener("click", e =>{
    
    validateform();  
});


function validateform(){

    // if all the information is valid Should be 0
    let validInputs = 0;

    //User input data
    const day = parseInt(txtDay.value) ;
    console.log("a");
    const month = parseInt(txtMonth.value);
    const year = parseInt(txtYear.value);

    //Date From user
    const date = new Date( year , (month - 1) , day);

    // Reset styles
    cleanHtml();


    userTxt.forEach(userInput =>{

        // Check if its empty or diferent from a number
        if(isNaN(parseInt(userInput.lastElementChild.value))){
            validInputs += 1;
            errorMsg(userInput,"This field is required");
            return;
        }
        //Check for invalid numbers in the date
        else if(userInput.lastElementChild.id === "day" ){
            if(parseInt(userInput.lastElementChild.value) > 31){
                validInputs += 1;
                errorMsg(userInput,"Must be a valid day");
                
                return;
            }
            else if (parseInt(userInput.lastElementChild.value) !== date.getDate()){
                validInputs += 1;
                errorMsg(userInput,"Must be a valid date");
            }
            
        }
        else if (userInput.lastElementChild.id === "month" && parseInt(userInput.lastElementChild.value) > 12){
            validInputs += 1;
            errorMsg(userInput,"Must be a valid month");
            return;
        }
        else if (userInput.lastElementChild.id === "year" && parseInt(userInput.lastElementChild.value) > currentDate.getFullYear() ){
            validInputs += 1;
            errorMsg(userInput,"Must be in the past");
            return;
        }
        else if (userInput.lastElementChild.id === "year" && parseInt(userInput.lastElementChild.value) === currentDate.getFullYear() ){
         
            if(parseInt(txtMonth.value) === (currentDate.getMonth() + 1)){
                if(parseInt(txtDay.value) > currentDate.getDate()){
                    validInputs += 1;
                    errorMsg(userInput,"Must be in the past");
                    return;
                }
                else if ((parseInt(txtDay.value) === currentDate.getDate())){
                    validInputs += 1;
                    errorMsg(userInput,"Must be in the past");
                    return;
                }
            }
            else if (parseInt(txtMonth.value) > (currentDate.getMonth() + 1)){
                validInputs += 1;
                errorMsg(userInput,"Must be in the past");
                return;
            }
        }
    });

    // If all user inputs contain valid information 

    if(validInputs === 0){
        userInfoHTML();
    }
}

function errorMsg(userInput,msg){
    
    //Creates element
    const errorMsg = document.createElement("P");
    errorMsg.innerText = msg;

    //Element styling
    userInput.firstElementChild.classList.add("error");
    errorMsg.classList.add("error-msg");
    userInput.firstElementChild.nextElementSibling.classList.add("error-border");

    // Adds element to html
    userInput.appendChild(errorMsg);
}

function cleanHtml(){

    userTxt.forEach( el =>{
        if(el.lastElementChild.className === "error-msg"){
            el.firstElementChild.classList.remove("error");
            el.firstElementChild.nextElementSibling.classList.remove("error-border");
            el.removeChild(el.lastElementChild);
        }
    });
}

function userInfoHTML(){
    const titleYears = document.getElementById("txt-years");
    const titleMonths = document.getElementById("txt-months");
    const titleDays = document.getElementById("txt-days");

    // Change text content in titles

    titleYears.innerText = (currentDate.getMonth() + 1) > parseInt(txtMonth.value) || (currentDate.getMonth() + 1) === parseInt(txtMonth.value) ?  currentDate.getFullYear() - parseInt(txtYear.value) : (currentDate.getFullYear() - parseInt(txtYear.value)) - 1 ;
    titleMonths.innerText = (currentDate.getMonth() + 1) > parseInt(txtMonth.value) || (currentDate.getMonth() + 1) === parseInt(txtMonth.value) ? (currentDate.getMonth() + 1) - parseInt(txtMonth.value) : parseInt(txtMonth.value) - (currentDate.getMonth() + 1);
    titleDays.innerText = currentDate.getDate() >  parseInt(txtDay.value) || currentDate.getDate() === parseInt(txtDay.value) ? currentDate.getDate() - parseInt(txtDay.value) : parseInt(txtDay.value) - currentDate.getDate();
}