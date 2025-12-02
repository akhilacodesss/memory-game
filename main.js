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

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;



function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function assignColors() {
  const shuffled = shuffle([...colors]);

  cards.forEach((card, index) => {
    card.dataset.color = shuffled[index];
    card.style.backgroundColor = "#b36788";
    card.classList.remove("matched");
  });

  firstCard = null;
  secondCard = null;
  lockBoard = false;

  matchedPairs = 0;
  matched.textContent = matchedPairs;
  message.textContent = "";
}

function flipCard(card) {
  if (lockBoard) return;
  if (card.classList.contains("matched")) return;
  if (card === firstCard) return;

  card.style.backgroundColor = card.dataset.color;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.color === secondCard.dataset.color;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;
    matched.textContent = matchedPairs;
    message.textContent = "Match found!";

    resetSelection();
    return;
  }
   message.textContent = "Not a match, try again";

  setTimeout(() => {
    firstCard.style.backgroundColor = "#b36788";
    secondCard.style.backgroundColor = "#b36788";
    resetSelection();
  }, 900);
}

function resetSelection() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  if (matchedPairs === colors.length / 2) {
    message.textContent = "You won! Click Restart to play again.";
  }
}



function resetGame() {
  shuffle(colors);
  assignColors();
}

cards.forEach(card => {
  card.addEventListener("click", () => flipCard(card));
});

restartBtn.addEventListener("click", resetGame);

shuffle(colors);
assignColors();