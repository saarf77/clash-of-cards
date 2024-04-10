// Task 1 tests - creat and shuffle deck
function testDeckCreation() {
  const deck = createDeck();
  if (deck.length === 40) {
    console.log("Deck creation test passed.");
    console.log("Allocated cards:", deck.join(", "));
  } else {
    console.error("Deck creation test failed.");
  }
}

function testDeckShuffling() {
  const originalDeck = createDeck();
  const shuffledDeck = shuffle([...originalDeck]);
  if (JSON.stringify(shuffledDeck) !== JSON.stringify(originalDeck)) {
    console.log("Deck shuffling test passed.");
    console.log("Original deck:", originalDeck.join(", "));
    console.log("Shuffled deck:", shuffledDeck.join(", "));
  } else {
    console.error("Deck shuffling test failed.");
  }
}

// Task 2 test  - draw cards
function testDrawCards() {
  const playerHand = [];
  // Simulate a draw pile with some cards
  const drawPile = ["Ace of Spades", "King of Hearts", "Queen of Diamonds"];
  // Simulate a discard pile with some cards
  const discardPile = ["Jack of Clubs", "10 of Spades"];

  // Draw a card from the draw pile and add it to the player's hand
  drawCard(playerHand, drawPile, discardPile);

  if (playerHand.length === 1) {
    console.log("Draw cards test passed.");
    console.log("Player's hand:", playerHand.join(", "));
  } else {
    console.error("Draw cards test failed.");
  }
}

// Task 3 tests - playing a turn
function testPlayingTurn() {
  const player1 = [8, 5, 7];
  const player2 = [6, 9, 4];
  const discardPile = [];

  console.log("Initial hands:");
  console.log("Player 1:", player1.join(", "));
  console.log("Player 2:", player2.join(", "));

  console.log("Simulating a round...");
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
  }

  console.log("Updated hands:");
  console.log("Player 1:", player1.join(", "));
  console.log("Player 2:", player2.join(", "));
}

// Run the tests - you can see the results in the conlsole in the browser developer tool.
testDeckCreation();
testDeckShuffling();
testDrawCards();
testPlayingTurn();

// Task 4: Console Output
// look at the console
