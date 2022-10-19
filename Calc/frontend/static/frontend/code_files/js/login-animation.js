const userForm = document.querySelector("#form");
const alt = document.querySelector(".alt");
const userInput = document.querySelector("#username");
const greeting = document.querySelector(".greeting");
const hidden = document.querySelector(".hidden");
const instruct = document.querySelector(".instruct");
const intro = document.querySelector(".intro");

function checkValue(event){
    let index = -1;
    for(let subString of userInput.value){
        index++
        if(!Number.isNaN(parseInt(subString) )){
            break
        }
        else if(Number.isNaN(parseInt(subString)) && userInput.value.indexOf(subString, index) == userInput.value.length - 1){
        event.preventDefault();
        }
    }
}

let timeG = setTimeout(()=>{
        greeting.classList.add("start-g");
        instruct.classList.add("start-g");
        setTimeout(()=>{
            greeting.classList.remove("start-g");
            instruct.classList.remove("start-g");
            greeting.classList.add("end-g");
            instruct.classList.add("end-g");
    setTimeout( ()=>{
                    intro.classList.add("intro-add");
        setTimeout(()=>{
                          userForm.classList.remove("hidden");  
            setTimeout(()=>{
                        userForm.classList.add("show-form");
                setTimeout(()=>{
                        alt.classList.remove("hidden");
                        }, 1500)
                    },500)
                }, 2000)
            }, 1000)
        }, 2000)
}, 1000);
