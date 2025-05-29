let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winpattern = [
    [0, 1, 2],
    [0, 3, 6], 
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    msgContainer.style.animation = "none";
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#f9c74f";
        } else {
            box.innerText = "X";
            box.style.color = "#f94144";
        }
        box.disabled = true;
        turnO = !turnO;
        box.style.animation = "popIn 0.3s ease";

        checkwinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "";
        box.style.backgroundColor = "#778da9";
        box.style.animation = "none"; 
    }
    document.querySelector(".game").style.animation = "fadeIn 0.5s forwards";
};

const showWinner = (winner, pattern) => {
    msg.innerText = `🎉 ${winner} WINS!
    
                                SCROLL   DOWNS!`;
    msgContainer.classList.remove("hide");
    msgContainer.style.animation = "slideIn 0.6s ease";
    disableBoxes();
    pattern.forEach(index => {
        boxes[index].style.backgroundColor = "#90be6d";
        boxes[index].style.animation = "glow 1s infinite alternate";
    });
};

const checkwinner = () => {
    let winnerFound = false;

    for (let pattern of winpattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos1Val === pos3Val) {
                winnerFound = true;
                showWinner(pos1Val, pattern);
                return;
            }
        }
    }
    let isDraw = true;
    boxes.forEach(box => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (!winnerFound && isDraw) {
        msg.innerText = `🤝 IT'S A DRAW!
        
                            SCROLL DOWN!`;
        msgContainer.classList.remove("hide");
        msgContainer.style.animation = "slideIn 0.6s ease";
        disableBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
