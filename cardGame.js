let rounds = 0;
let winner = "";
let player1Wins = 0;
let player2Wins = 0;

function createDeck() {
  const cards = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 0; j < 4; j++) {
      cards.push(i);
    }
  }
  return shuffle(cards);
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function drawCard(playerHand, drawPile, discardPile) {
  // If the draw pile is empty, shuffle the discard pile and use it as the new draw pile
  if (drawPile.length === 0) {
    shuffleDiscardIntoDraw(drawPile, discardPile);
  }

  // Draw a card randomly from the draw pile
  const randomIndex = Math.floor(Math.random() * drawPile.length);
  const card = drawPile.splice(randomIndex, 1)[0];

  // Add the drawn card to the player hand
  playerHand.push(card);
}

function shuffleDiscardIntoDraw(drawPile, discardPile) {
  shuffle(discardPile);
  drawPile.push(...discardPile);
  discardPile.length = 0;
}

function displayWinner() {
  const resultDiv = document.getElementById("result");
  const player1Div = document.getElementById("player1");
  const player2Div = document.getElementById("player2");

  player1Div.classList.remove("winner", "loser");
  player2Div.classList.remove("winner", "loser");

  if (winner === "Player 1") {
    player1Div.classList.add("winner");
    player2Div.classList.add("loser");
    resultDiv.style.color = "#2a9d8f";
    player1Wins++;
  } else {
    player1Div.classList.add("loser");
    player2Div.classList.add("winner");
    resultDiv.style.color = "#e76f51";
    player2Wins++;
  }

  resultDiv.innerHTML = `Winner: ${winner}<br><br>Rounds played: ${rounds}<br><br>Player 1 Wins: ${player1Wins}<br>Player 2 Wins: ${player2Wins}`;
}

function playCardGame() {
  const player1 = [];
  const player2 = [];
  const drawPile = createDeck();
  const discardPile = [];

  for (let i = 0; i < 20; i++) {
    drawCard(player1, drawPile, discardPile);
    drawCard(player2, drawPile, discardPile);
  }
  console.log(`Player 1 (${player1.length} cards): ${player1[player1.length - 1]}`);
  console.log(`Player 2 (${player2.length} cards): ${player2[player2.length - 1]}`);

  while (player1.length > 0 && player2.length > 0) {
    const card1 = player1.pop();
    const card2 = player2.pop();

    console.log(`Player 1 plays: ${card1}`);
    console.log(`Player 2 plays: ${card2}`);

    if (card1 > card2) {
      player1.push(card1, card2);
      console.log("Player 1 wins this round");
    } else if (card2 > card1) {
      player2.push(card1, card2);
      console.log("Player 2 wins this round");
    } else {
      console.log("No winner in this round");
      const tiedCards = [card1, card2];
      let nextRoundWinner = null;

      while (tiedCards.length < 4 && player1.length > 0 && player2.length > 0) {
        const nextCard1 = player1.pop();
        const nextCard2 = player2.pop();

        console.log(`Player 1 plays: ${nextCard1}`);
        console.log(`Player 2 plays: ${nextCard2}`);

        tiedCards.push(nextCard1, nextCard2);

        if (nextCard1 > nextCard2) {
          nextRoundWinner = player1;
        } else if (nextCard2 > nextCard1) {
          nextRoundWinner = player2;
        }

        if (nextRoundWinner) {
          nextRoundWinner.push(...tiedCards);
          console.log(`Player ${nextRoundWinner === player1 ? "1" : "2"} wins the tied rounds`);
          break;
        }
      }
      if (!nextRoundWinner) {
        discardPile.push(...tiedCards);
      }
    }
    console.log(`Player 1 (${player1.length} cards): ${player1.join(", ")}`);
    console.log(`Player 2 (${player2.length} cards): ${player2.join(", ")}`);
    rounds++;
  }
  if (player1.length === 0) {
    winner = "Player 2";
  } else {
    winner = "Player 1";
  }

  console.log(`Player 1 (${player1.length} cards): ${player1.length > 0 ? player1[player1.length - 1] : "No cards"}`);
  console.log(`Player 2 (${player2.length} cards): ${player2.length > 0 ? player2[player2.length - 1] : "No cards"}`);

  displayWinner();
}

function initializeGameBtn() {
  const startButton = document.getElementById("startGame");
  startButton.addEventListener("click", () => {
    rounds = 0;
    winner = "";

    // Clear any existing result
    document.getElementById("result").textContent = "";

    playCardGame();
    startButton.textContent = "Restart";
  });
}
initializeGameBtn();
