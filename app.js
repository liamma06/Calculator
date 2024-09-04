function add(first,second){
    return(first+ second);
}

function minus(first,second){
    return first - second; 
}

function multiply(first, second){
    return first*second;
}

function divide(first,second){
    return first/second;
}

function percent(num){
    return num/100;
}

let first;
let second;
let operator;
let operatorClicked = false;

function operate(operator,first,second){
    if(operator == '+'){
        return add(first,second);
    }else if(operator == '-'){
        return minus(first,second);
    }else if(operator == '*'){
        return multiply(first,second);
    }else if(operator == '/'){
        return divide(first,second)
    }
}

const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

let currentNumber="";
let lastOperatorButton = null;

buttons.forEach((button) =>{
    button.addEventListener("click", ()=>{
        button.classList.add("brighter");

        
        setTimeout(() => {
            button.classList.remove("brighter");
        }, 200);


        if(!isNaN(button.id)){
            if (lastOperatorButton) {
                lastOperatorButton.style.backgroundColor = ""; 
                lastOperatorButton.style.color = ""; 
                lastOperatorButton = null; 
            }

            if(operatorClicked){
                display.innerHTML = "";
                operatorClicked = false;
            }
            if(display.innerHTML=="0"){
                display.innerHTML="";
            }
            currentNumber += button.id
            display.innerHTML+= button.id;
        }else{
            if(button.id=="+" || button.id=="-" || button.id=="*"||button.id=="/"){
                //store number and operator
                first = getCurrentNumber();
                operator=button.id;

                operatorClicked= true;
                button.style.backgroundColor = "white";
                button.style.color = "#ff9f0a";

                lastOperatorButton = button;

                //reset
                currentNumber="";
                display.innerHTML= first;
            }else if(button.id =="="){
                //calculation
                second = getCurrentNumber();
                let result = operate(operator,first,second);
                display.innerHTML = result;
                currentNumber = result.toString();
                first = null;
                second = null;
                operator = null;

                if (lastOperatorButton) {
                    lastOperatorButton.style.backgroundColor = "";
                    lastOperatorButton.style.color = "";
                    lastOperatorButton = null;
                }
            }else if(button.id =="AC"){
                //clear
                first=null;
                second = null;
                operator = null;
                currentNumber = "";
                display.innerHTML = "0"

                if (lastOperatorButton) {
                    lastOperatorButton.style.backgroundColor = "";
                    lastOperatorButton.style.color = "";
                    lastOperatorButton = null;
                }
            } else if (button.id === "%") {
                let num = getCurrentNumber();
                let result = percent(num);
                display.innerHTML = result;
                currentNumber = result.toString();
           }else if (button.id === ".") {

                if (!currentNumber.includes(".")) {
                    if (currentNumber === "") {
                        currentNumber = "0"; 
                    }
                    currentNumber += ".";
                    display.innerHTML += ".";
                }   
            }else if(button.id === "posNeg"){
                if(currentNumber !==""){
                    currentNumber = (parseFloat(currentNumber) * -1).toString();
                    display.innerHTML = currentNumber;
                }
            }
        }
    });
});

function getCurrentNumber(){
    return parseFloat(currentNumber);
}
