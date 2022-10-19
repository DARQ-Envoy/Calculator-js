const userForm = document.querySelector("#form");
const alt = document.querySelector(".alt");
const userInput = document.querySelector("#username");
const greeting = document.querySelector(".greeting");
const hidden = document.querySelector(".hidden");
const instruct = document.querySelector(".instruct");
const intro = document.querySelector(".intro");
// userForm.addEventListener("submit", checkValue);

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
const allTransElements = [intro, greeting, instruct, userForm];
allTransElements.forEach((element, index)=>{
    element.style.transition = "none"
})

function setElements(){
            greeting.classList.add("end-g");
            instruct.classList.add("end-g");
            intro.classList.add("intro-add");
            userForm.classList.remove("hidden");  
            userForm.classList.add("show-form");
            alt.classList.remove("hidden");
}
setElements()



// First animation

// let timeG = setTimeout(()=>{
//         greeting.classList.add("start-g");
//         instruct.classList.add("start-g");
//         setTimeout(()=>{
//             greeting.classList.remove("start-g");
//             instruct.classList.remove("start-g");
//             greeting.classList.add("end-g");
//             instruct.classList.add("end-g");
//     setTimeout( ()=>{
//                     intro.classList.add("intro-add");
//         setTimeout(()=>{
//                           userForm.classList.remove("hidden");  
//             setTimeout(()=>{
//                         userForm.classList.add("show-form");
//                 setTimeout(()=>{
//                         alt.classList.remove("hidden");
//                         }, 1500)
//                     },500)
//                 }, 2000)
//             }, 1000)
//         }, 2000)
// }, 1000);







// const actions = new Map([
//     [1000, ()=>{ 
//      greeting.classList.add("start-g");
//     instruct.classList.add("start-g");
// }],

//     [2000,()=>{
//         greeting.classList.remove("start-g");
//         instruct.classList.remove("start-g");
//         greeting.classList.add("end-g");
//         instruct.classList.add("end-g");} ],

//     ["1000", ()=>{
//         intro.classList.add("intro-add");}],

//         ["2000", ()=>{
//             userForm.classList.remove("hidden");  }],

//         [500, ()=>{
//             userForm.classList.add("show-form");}],

//         [1500, ()=>{
//             alt.classList.remove("hidden");
//             }]

// ]);
// console.log(typeof actions.get(2000)())
// actions.forEach((value, keys)=>{
//     // debugger
//     let func = value
//     let number = parseInt(keys)
//     console.log(func, number)
//     let tim =  setTimeout(func, number );
//     // console.log(parseInt(keys),",", value)
// })



// let actionKeys = [...actions.keys()];
// let index = -1;
//         let my = setInterval(()=>{
//         index ++
//         console.log(actionKeys.length)
//         setTimeout(
//             actions.get(actionKeys[index])
        
//        , parseInt(actionKeys[index]) );
//         if(index === actionKeys.length){
//         clearInterval(my)
//         };
//         }, 200)