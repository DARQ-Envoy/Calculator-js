                "use strict";
const inputBtns = document.querySelector("#input-buttons");
const display = document.querySelector("#display-input");
const allBtns = inputBtns.querySelectorAll("button");
const actions = {"delete": deleteEntry, "reset": resetCalc,"result": result};
const rangeEl = document.querySelector("#range");
const resultBtn =  document.querySelector("#result");
const mainHistory =  document.querySelector("#his-main");
const showHistory =  document.querySelector("#his-display");
const closeHistory =  document.querySelector(".close-history");
const historyList =  document.querySelector(".his-list");
const allEditButtons = historyList.querySelectorAll("button");
const allEBtnArr = Array.from(allEditButtons);
const user = document.querySelector("#user")
const clearHistory = document.querySelector("#clear-History")
let answer = false;
let numbers = Array();
let operators = "";
// 
let inputLength;
let userInput = ""; 
let userEquation;
//

// History
let userHistory;
let username = user.textContent;



// Calculator

for(let button of allBtns){
    if(isNaN(button.textContent) && button.textContent !== "." && !(button.id in actions) ){
        operators += button.textContent;
        operators = operators.replace("x", "*")
    }
    let func;
    if(button.id in actions){
        func = actions[button.id];
    }
    else{
        func = inputValue;
    };
    button.addEventListener("click", ()=>{
        func(button);
        // if(button === resultBtn){
        //     console.log({button})
        //     postEquation(button)
        // }
    });
}
function deleteEntry(element, start = 0, stop = userInput.length - 1){
    userInput = userInput.slice(start, stop);
    renderEquation()
}
function resetCalc(element){
userInput = "";
renderEquation()
}


// Note: For now call addValues() through result() alone

function result(element){
    let  realNAN = false;
    let values;
    let operationSign;
    inputLength = userInput.length;
    let index = -1;
    let contains = false;
    numbers = Array();
    for(let element of userInput){
        index++;
     realNAN = Number.isNaN(parseFloat(element)) ? true : false;
     if(operators.includes(element)){
     contains = true;
     }
    if(!realNAN){
        if(values == undefined){
        values = element;
        }
        else{
            values += element;
            }
        if(userInput.indexOf(element, index) === inputLength - 1 && contains){
     
        answer = true;
        addValues(values);
            }
     }
    else if(realNAN){
        operationSign = element;
        addValues(values, operationSign)
        values = undefined;
                            }
    }


}


function inputValue(element){   
let str = "";
let content = element.textContent !== "x" ? element.textContent : "*";
inputLength = userInput.length;
let indexed = -1;
let elHigherOrder ;
let subLowerOrder;
for(let subString of userInput){
        indexed ++
    if(operators.includes(subString)){
    if(userInput.indexOf(subString, indexed) == inputLength - 1 && operators.includes(content)){
        subLowerOrder = operators.indexOf(subString) < 2 ? true : false;
        elHigherOrder = operators.indexOf(content) > 1 ? true : false;  
        if(subLowerOrder && !elHigherOrder || elHigherOrder && !subLowerOrder || subLowerOrder && elHigherOrder ){
                deleteEntry(element, 0, inputLength-1 );
                inputValue(element);
                return;
        }
}
        str = "";
        continue;
        }
    else{
                str += subString;
        }
    } 
if(content === "."){
            if(str.includes(".")){
                return;
                    }
           else if(!str) {
                str = 0 + content;
                userInput += str;
                } 
            else{
                userInput += content;
                }                 
        }
    else{
        if(str === "0" && !(Number.isNaN(parseFloat(content)) ) ){
                deleteEntry(element, 0, userInput.indexOf(str[0], indexed) )
        }
        if(userInput == "Invalid Equation"){
            resetCalc();
        }
        if(userInput == "" && operators.slice(2,operators.length).includes(content)){
            return;
        }
            userInput += content;
    }
// Adding Comma;
renderEquation()
}


function renderEquation(valRender = userInput){
let displayValue = "";
let values = "";
let addVal = true;
let indices = -1;
    for (let substring of valRender){
        indices++;
        if(operators.includes(substring) || substring == "."){
            values = "";
            addVal = true;
            if(substring == "."){
                addVal = false
            }
            displayValue += substring;
        }
        else if(!(operators.includes(substring)) && addVal){
    let noTimes = 0;
    let multiple = 4;
    let index;
    let commaPoint;
    let noOfComma = 0;
    
    values = values.replaceAll(",", "");
    values +=substring
    for(let sub in values){
            index = ~~sub + 1
            commaPoint = values[values.length - index - noOfComma];
            noTimes ++;
            if(noTimes === multiple){
            values = values.slice(0,  values.indexOf(commaPoint, values.length-index-noOfComma)+1 ) + "," +values.slice(values.indexOf(commaPoint, values.length-index- noOfComma)+1, values.length);
            // Please note it is important that noOfComma is placed immediately before the for loop.
            noOfComma = 0 ;
            // Take note;
            for(let comma of values ){
                if(comma === ","){
                    noOfComma++
                }
            }
            multiple+= 3
            }
    
        }
        if(operators.includes(valRender[indices+1])|| valRender[indices+1] == "." || valRender.indexOf(substring, indices) == valRender.length - 1){
            displayValue += values;
        }
        }
    else{
        displayValue += substring;
    }
    }
    display.value = displayValue.replaceAll("*", "x");
}
 function addValues(vals, operSign = null){
    let equation;
    let result;
    numbers.push(vals)
    if(operSign){
    numbers.push(operSign);
    }
    if(answer){
        equation = numbers.join("");
        userEquation = equation;
        result = Function(`${equation}; return ${equation}`)();
        if(result == Infinity){
            result = 'Invalid Equation';
        }
        userInput = String(result);
        answer = false;
        postEquRequest()
    }

    renderEquation(userInput)
 }
 
document.body.classList.add(`theme-${rangeEl.value}`)
 rangeEl.addEventListener("input", ()=>{
    document.body.className = "";
    document.body.classList.add(`theme-${rangeEl.value}`)
})


// History
showHistory.addEventListener("click",(e)=>{
    cHistory(e.target, "add")
    })
    closeHistory.addEventListener("click",(e)=>{
        cHistory(e.target, "remove")
    })
    function cHistory(element, action){
        if(action === "add"){
        mainHistory.classList.add("open-main-history","width-his")
        }
        else{
        mainHistory.classList.remove("open-main-history")
            setTimeout(()=>{
        mainHistory.classList.remove("width-his")}, 2000)
        }
    }
allEBtnArr.forEach((btn, index)=>{
    btn.addEventListener("click",()=>{
            editEquation(btn, index)
            })
})


function editEquation(element, index){
    let equation = historyList.querySelector(`#equ-${index}`)
    userInput = equation.textContent;
    cHistory(element, "remove")
    renderEquation(userInput)
}

// Ajax & Fetch API

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        // console.log(cookies)
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // console.log(cookie);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                console.log(cookieValue)
                break;
            }
        }
    }
    return cookieValue;
}
function postEquRequest(){
    let ajaxPost = new XMLHttpRequest();
    let username = user.textContent
    // let jsonData = JSON.stringify({equation:userEquation})
    let equValue = userEquation.replaceAll("+","p")
    let csrftoken = getCookie("csrftoken")
    ajaxPost.open("POST","http://127.0.0.1:8000/backend/save_equation/");
    ajaxPost.setRequestHeader("X-CSRFToken",csrftoken);
    ajaxPost.setRequestHeader("content-type","application/x-www-form-urlencoded")
    // ajaxPost.setRequestHeader("content-type","application/json")
    ajaxPost.onload = function(){
        if(this.status === 200){
            let response = this.responseText
            let data = JSON.parse(response)
            userHistory = data;
            displayHistory()
        }
        else{
            console.log(this.status)
        }
    }
    ajaxPost.onerror = function(){
        console.log(this.readyState)
    }
    // ajaxPost.send(`${jsonData}`);
    ajaxPost.send(`equation=${equValue}&username=${username}`);
}


function getEqu(){
    let username = user.textContent;
    fetch(`http://127.0.0.1:8000/backend/save_equation/?username=${username}`)  
    .catch(err=>{console.log(err)})
    .then(res =>res.json())
    .then(js =>{
        userHistory = js;
        displayHistory()
    })

}
getEqu()
// Display History

function displayHistory(){
    historyList.innerHTML = ``
    let index = -1
    for(let equation in userHistory){
        index++
        let date = userHistory[equation]["date-created"]
        let equ = userHistory[equation]["equation"]
        let li = document.createElement("li");
        li.innerHTML=   `
        <small>${date}</small>
        <b id='equ-${index}'>${equ}</b>
        <button>Get Result</button>
              `
        historyList.appendChild(li)
    }
}

// Clear History
clearHistory.addEventListener("click",clearHis);
function clearHis(){
    fetch(`http://127.0.0.1:8000/backend/save_equation/?username=${username}&instruction=clear`)
    .then(res=>res.text)
    .then(data=>{console.log(data)})
}

