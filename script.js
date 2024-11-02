let words = ["apple", "banana", "cherry", "grape", "orange"];
let selectedWord = "";
let displayedWord = "";
let attemptsLeft = 5;
let wrongGuesses = [];

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = "_ ".repeat(selectedWord.length).trim();
    document.getElementById("wordDisplay").innerText = displayedWord;
    document.getElementById("attempts").innerText = `Attempts left: ${attemptsLeft}`;
    document.getElementById("wrongGuesses").innerText = "Wrong guesses: ";
    document.getElementById("letterInput").value = "";
}

function guessLetter() {
    const input = document.getElementById("letterInput").value.toLowerCase();
    document.getElementById("letterInput").value = ""; // Clear input field

    if (input.length === 1 && /^[a-z]$/.test(input)) {
        if (wrongGuesses.includes(input) || displayedWord.includes(input)) {
            alert("You've already guessed that letter!");
            return;
        }

        if (selectedWord.includes(input)) {
            let newDisplayedWord = "";
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === input) {
                    newDisplayedWord += input + " ";
                } else {
                    newDisplayedWord += displayedWord[i * 2] + " "; // Keep previous state
                }
            }
            displayedWord = newDisplayedWord.trim();
            document.getElementById("wordDisplay").innerText = displayedWord;

            if (!displayedWord.includes("_")) {
                alert("Congratulations! You've guessed the word!");
            }
        } else {
            wrongGuesses.push(input);
            attemptsLeft--;
            document.getElementById("wrongGuesses").innerText = "Wrong guesses: " + wrongGuesses.join(", ");
            document.getElementById("attempts").innerText = `Attempts left: ${attemptsLeft}`;
            
            if (attemptsLeft === 0) {
                alert(`Game over! The word was "${selectedWord}".`);
            }
        }
    } else {
        alert("Please enter a valid letter.");
    }
}

function resetGame() {
    attemptsLeft = 5;
    wrongGuesses = [];
    startGame();
}

// Initialize game
startGame();
