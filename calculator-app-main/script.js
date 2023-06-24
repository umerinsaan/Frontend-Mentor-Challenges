const root = document.documentElement;

const input = document.querySelector(".input");

let operand1;
let operator;
let operand2;

const digits = document.querySelectorAll(".digit");
const operatorsMap = new Map();

operatorsMap.set("+", document.querySelector(".plus-btn"));
operatorsMap.set("-", document.querySelector(".minus-btn"));
operatorsMap.set("*", document.querySelector(".multiply-btn"));
operatorsMap.set("/", document.querySelector(".divide-btn"));

const dotBtn = document.querySelector(".dot-btn");
const equalBtn = document.querySelector(".equal-btn");
const delBtn = document.querySelector(".del-btn");
const resetBtn = document.querySelector(".reset-btn");

let operatorPressed = false;

let dotCount = 0;

let key = "";

input.addEventListener("keyup", (e) => {

    e.preventDefault();

    if (e.key === "Backspace") {
        document.querySelector(".del-btn").classList.add("del-hover");
        setTimeout(() => {
            document.querySelector(".del-btn").classList.remove("del-hover");
        }, 300);

        dotCount = input.value.split(".").length - 1;
    }

    else if (parseInt(e.key) >= 1 && parseInt(e.key) <= 9) {

        digits.forEach(digit => {
            if (digit.textContent === e.key) {
                digit.classList.add("digit-hover");
                setTimeout(() => {
                    digit.classList.remove("digit-hover");
                }, 300);
            }
        });
    }

    else if (e.key === "Enter") {

        equalBtn.classList.add("eq-btn-hover");

        setTimeout(() => {
            equalBtn.classList.remove("eq-btn-hover");
        }, 300);

        if (input.value.split(".").length - 1 > 1) {
            input.value = "ERROR !!";
        }
        else if (operatorPressed) {
            input.value = eval(operand1 + operator + operand2);
            operatorPressed = false;
        }
        dotCount = 0;
    }

});

input.addEventListener("input", (e) => {
    key = e.target.value[e.target.value.length - 1];

    e.target.value = e.target.value.replace(/[^0-9.]/g, '');

    if (key === ".") {
        dotCount++;
    }

    if (key === "=" && operatorPressed) {
        if (e.target.value.split(".").length - 1 > 1) {
            e.target.value = "ERROR !!";
        }
        else {
            e.target.value = eval(operand1 + operator + operand2);
            operatorPressed = false;
        }
    }

    if (operatorPressed) {
        operand2 = e.target.value;
    }

    if (key === "+") {
        operatorHandeler();
    }
    else if (key === "-") {
        operatorHandeler();
    }
    else if (key === "x" || key === "X" || key === "*") {
        key = "*";
        operatorHandeler();
    }
    else if (key === "/") {
        operatorHandeler();
    }
});

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        input.value = input.value + digit.innerHTML;
        if (input.value === "NaN") { input.value = ""; }
        if (operatorPressed) {
            operand2 = input.value;
        }
    });
});

operatorsMap.forEach((op) => {
    op.addEventListener("click", () => {
        key = op.textContent;
        operatorHandeler();
    });
});


function operatorHandeler() {
    if (dotCount > 1) {
        input.value = "ERROR !!";
        dotCount = 0;
        return;
    }

    if (key === "x") { key = "*"; }

    operatorsMap.get(key).classList.add("digit-hover");
    setTimeout(() => {
        operatorsMap.get(key).classList.remove("digit-hover");
    }, 300);

    dotCount = 0;
    operatorPressed = true;
    operand1 = input.value;
    operator = key;
    input.value = "";
}

equalBtn.addEventListener("click", () => {
    if (input.value.split(".").length - 1 > 1) {
        input.value = "ERROR !!";
    }
    else if (operatorPressed) {
        input.value = eval(operand1 + operator + operand2);
        operatorPressed = false;
    }
    dotCount = 0;
});

delBtn.addEventListener("click", () => {
    input.value = input.value.slice(0, -1);
});

dotBtn.addEventListener("click", () => {
    input.value += ".";
    dotCount++;
});

resetBtn.addEventListener("click", () => {
    input.value = "";
    operatorPressed = false;
    dotCount = 0;
});

//Themes logic here

const circle = document.querySelector(".circle");
const bar = document.querySelector(".bar");

let currentTheme = 1;
let circleLeftValues = ["7.5%", "40%", "74%"];

const topSection = document.querySelector(".top");
const keypad = document.querySelector(".keypad");

bar.addEventListener("click", () => {
    currentTheme++;
    currentTheme = (currentTheme > 3) ? 1 : currentTheme;

    circle.style.left = circleLeftValues[currentTheme - 1];

    switchTheme();
});

const themes = [{
    bodyBC: "hsl(222, 26%, 31%)",
    barBC: "hsl(223, 31%, 20%)",
    keypadBC: "hsl(223, 31%, 20%)",
    screenBC: "hsl(224, 36%, 15%)",
    resetAndDelBC: "hsl(225, 21%, 49%)",
    resetBRC: "hsl(224, 28%, 35%)",
    equalAndCircleBC: "hsl(6, 63%, 50%)",
    equalBRC: "hsl(6, 70%, 34%)",
    smallBtnBC: "hsl(30, 25%, 89%)",
    smallBtnBRC: "hsl(28, 16%, 65%)",
    inputTC: "hsl(0, 0%, 100%)",
    topTC: "hsl(0, 0%, 100%)",
    equalTC: "hsl(0, 0%, 100%)",
    smallBtnTC: "hsl(221, 14%, 31%)",
    resetAndDelHC: "hsl(225, 21%, 69%)",
    digitHC: "hsl(30, 25%, 100%)",
    equalHC: "hsl(6, 63%, 60%)"
}, {
    bodyBC: "hsl(0, 0%, 90%)",
    barBC: "hsl(0, 5%, 81%)",
    keypadBC: "hsl(0, 5%, 81%)",
    screenBC: "hsl(0, 0%, 93%)",
    resetAndDelBC: "hsl(185, 42%, 37%)",
    resetBRC: "hsl(185, 58%, 25%)",
    equalAndCircleBC: "hsl(25, 98%, 40%)",
    equalBRC: "hsl(25, 99%, 27%)",
    smallBtnBC: "hsl(45, 7%, 89%)",
    smallBtnBRC: "hsl(35, 11%, 61%)%)",
    inputTC: "hsl(60, 10%, 19%)",
    topTC: "hsl(60, 10%, 19%)",
    equalTC: "hsl(0, 0%, 100%)",
    smallBtnTC: "hsl(60, 10%, 19%)",
    resetAndDelHC: "hsl(185, 42%, 67%)",
    digitHC: "hsl(45, 7%, 100%)",
    equalHC: "hsl(25, 98%, 60%)"
}, {
    bodyBC: "hsl(268, 75%, 9%)",
    barBC: "hsl(268, 71%, 12%)",
    keypadBC: "hsl(268, 71%, 12%)",
    screenBC: "hsl(268, 71%, 12%)",
    resetAndDelBC: "hsl(281, 89%, 26%)",
    resetBRC: "hsl(285, 91%, 52%)",
    equalAndCircleBC: "hsl(176, 100%, 44%)",
    equalBRC: "hsl(177, 92%, 70%)",
    smallBtnBC: "hsl(268, 47%, 21%)",
    smallBtnBRC: "hsl(290, 70%, 36%)",
    inputTC: "hsl(52, 100%, 62%)",
    topTC: "hsl(52, 100%, 62%)",
    equalTC: "hsl(198, 20%, 13%)",
    smallBtnTC: "hsl(52, 100%, 62%)",
    resetAndDelHC: "hsl(281, 89%, 46%)",
    digitHC: "hsl(268, 47%, 50%)",
    equalHC: "hsl(176, 100%, 64%)"
}];

function switchTheme(){
    root.style.setProperty("--body-background-color",themes[currentTheme-1].bodyBC);
    root.style.setProperty("--bar-background-color",themes[currentTheme-1].barBC);
    root.style.setProperty("--keypad-background-color",themes[currentTheme-1].keypadBC);
    root.style.setProperty("--screen-background-color",themes[currentTheme-1].screenBC);
    root.style.setProperty("--reset-and-del-background-color",themes[currentTheme-1].resetAndDelBC);
    root.style.setProperty("--reset-and-del-border-color",themes[currentTheme-1].resetBRC);
    root.style.setProperty("--equal-and-circle-background-color",themes[currentTheme-1].equalAndCircleBC);
    root.style.setProperty("--equal-border-color",themes[currentTheme-1].equalBRC);
    root.style.setProperty("--small-btn-background-color",themes[currentTheme-1].smallBtnBC);
    root.style.setProperty("--small-btn-border-color",themes[currentTheme-1].smallBtnBRC);
    root.style.setProperty("--input-text-color",themes[currentTheme-1].inputTC);
    root.style.setProperty("--top-text-color",themes[currentTheme-1].topTC);
    root.style.setProperty("--equal-text-color",themes[currentTheme-1].equalTC);
    root.style.setProperty("--small-btn-text-color",themes[currentTheme-1].smallBtnTC);
    root.style.setProperty("--reset-and-del-hover-color",themes[currentTheme-1].resetAndDelHC);
    root.style.setProperty("--digit-hover-color",themes[currentTheme-1].digitHC);
    root.style.setProperty("--equal-hover-color",themes[currentTheme-1].equalHC);
}