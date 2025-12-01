const cards = document.querySelectorAll(".card");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const matched = document.getElementById("matched");



let colors = [

    "#863086ff", "#863086ff",
    "#1f6696ff", "#1f6696ff",
    "#2a6325ff", "#2a6325ff",
    "#4d2f16ff", "#4d2f16ff",
    "#af315bff", "#af315bff",
    "#9c2b2bff", "#9c2b2bff",
    "#0d3f44ff", "#0d3f44ff",
    "#0f1363ff", "#0f1363ff",

];
let Card1 = null;
let Card2 = null;
let flippedCard = false;
let matchedPairs = 0;
let gameOver = false;




function shuffleColors() {
    for (let i = 0; i < colors.length; i++) {
        let j = Math.floor(Math.random() * colors.length);

        let temp = colors[i];
        colors[i] = colors[j];
        colors[j] = temp;
    }
}

function assignColors() {
    cards.forEach(function(card, index) {
        card.color = colors[index];
        card.style.backgroundColor = "";
        card.matched = false;
    });

    matchedPairs = 0;
    matched.textContent = matchedPairs;
    message.textContent = "";
    Card1 = null;
    Card2 = null;
    flippedCard = false;
    gameOver = false;
}

function clickedCard(card) {
    cardClick(card);
}


function cardClick(card) {
    if (card.matched) return;
    if (gameOver || flippedCard || card === Card1 || card.matched) return;


    card.style.backgroundColor = card.color;

    if (!Card1) {
        Card1 = card;
    } else {
        Card2 = card;
        flippedCard = true;
        checkMatch();
    }
}

function checkMatch() {
    if (Card1.color === Card2.color) {
        matchedPairs++;
        matched.textContent = matchedPairs;
        message.textContent = "Yayy You found a match";

        Card1.matched = true;
        Card2.matched = true;


        resetFlippedCards();
        checkWin();

    } else {
        message.textContent = "Try again!";

        Card1.style.backgroundColor = "";
        Card2.style.backgroundColor = "";
        resetFlippedCards();
    }
}

function resetFlippedCards() {
    Card1 = null;
    Card2 = null;
    flippedCard = false;
}

function checkWin() {
    if (matchedPairs === colors.length / 2) {
        message.textContent = "Yay you WON the game, Click Restart to play again";
        gameOver = true;
    }
}


function resetGame() {
    shuffleColors();
    assignColors();
}

cards.forEach(function(card) {
    card.addEventListener("click", function() {
        clickedCard(card);
    });
});

restartBtn.addEventListener("click", resetGame);


shuffleColors();
assignColors();