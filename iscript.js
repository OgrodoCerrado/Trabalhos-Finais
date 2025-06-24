alert('Boas vindas ao jogo da memória');

const cards = document.querySelectorAll('.carta');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let tentativas = 0
let pairsFound = 0; // Variável para contar os pares encontrados
const totalPairs = cards.length / 2; // Total de pares


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  
  pairsFound++; // Incrementa o número de pares encontrados

  // Verifica se todos os pares foram encontrados
  if (pairsFound === totalPairs) {
    alert('Parabéns! Você encontrou todas as cartas com apenas ' + tentativas + ' tentativas!');
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  tentativas ++
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

