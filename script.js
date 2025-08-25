class WordleGame {
    constructor() {
        this.words = [
            'APPLE', 'BRAVE', 'CHAIR', 'DANCE', 'EAGLE', 'FLAME', 'GRAPE', 'HOUSE', 'IMAGE', 'JUMPS',
            'KNIFE', 'LIGHT', 'MONEY', 'NIGHT', 'OCEAN', 'PIANO', 'QUIET', 'RADIO', 'SNAKE', 'TABLE',
            'UNDER', 'VOICE', 'WATER', 'YOUNG', 'ZEBRA', 'BEACH', 'CLOUD', 'DREAM', 'EARTH', 'FRESH',
            'GLASS', 'HAPPY', 'JUNGLE', 'LEARN', 'MAGIC', 'NOVEL', 'PLANT', 'QUEEN', 'RIVER', 'SMILE',
            'TRUST', 'VALUE', 'WORLD', 'YOUTH', 'ZEBRA', 'ALBUM', 'BREAD', 'CREAM', 'DRIVE', 'ENTER',
            'FIELD', 'GHOST', 'HORSE', 'INDEX', 'JEWEL', 'KINGS', 'LEMON', 'MOUSE', 'NURSE', 'OFFER'
        ];
        this.currentWord = this.getRandomWord();
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameBoard = [];
        this.gameOver = false;
        this.won = false;
        
        this.initializeBoard();
        this.setupEventListeners();
        this.showMessage('Start guessing! Type a 5-letter word.');
    }
    
    getRandomWord() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }
    
    initializeBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        for (let row = 0; row < 6; row++) {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            this.gameBoard[row] = [];
            
            for (let col = 0; col < 5; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `cell-${row}-${col}`;
                rowElement.appendChild(cell);
                this.gameBoard[row][col] = '';
            }
            
            gameBoard.appendChild(rowElement);
        }
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            key.addEventListener('click', () => this.handleKeyClick(key.dataset.key));
        });
        
        document.getElementById('new-game-btn').addEventListener('click', () => this.newGame());
    }
    
    handleKeyPress(e) {
        if (this.gameOver) return;
        
        const key = e.key.toUpperCase();
        
        if (key === 'ENTER') {
            this.submitGuess();
        } else if (key === 'BACKSPACE') {
            this.deleteLetter();
        } else if (key.match(/[A-Z]/) && key.length === 1) {
            this.addLetter(key);
        }
    }
    
    handleKeyClick(key) {
        if (this.gameOver) return;
        
        if (key === 'Enter') {
            this.submitGuess();
        } else if (key === 'Backspace') {
            this.deleteLetter();
        } else {
            this.addLetter(key);
        }
    }
    
    addLetter(letter) {
        if (this.currentCol < 5) {
            this.gameBoard[this.currentRow][this.currentCol] = letter;
            const cell = document.getElementById(`cell-${this.currentRow}-${this.currentCol}`);
            cell.textContent = letter;
            cell.classList.add('filled');
            this.currentCol++;
        }
    }
    
    deleteLetter() {
        if (this.currentCol > 0) {
            this.currentCol--;
            this.gameBoard[this.currentRow][this.currentCol] = '';
            const cell = document.getElementById(`cell-${this.currentRow}-${this.currentCol}`);
            cell.textContent = '';
            cell.classList.remove('filled');
        }
    }
    
    submitGuess() {
        if (this.currentCol !== 5) {
            this.showMessage('Not enough letters!', 'error');
            return;
        }
        
        const guess = this.gameBoard[this.currentRow].join('');
        
        if (!this.isValidWord(guess)) {
            this.showMessage('Not a valid word!', 'error');
            return;
        }
        
        this.checkGuess(guess);
        this.updateKeyboard(guess);
        
        if (guess === this.currentWord) {
            this.gameOver = true;
            this.won = true;
            this.showMessage('Congratulations! You won!', 'success');
        } else if (this.currentRow === 5) {
            this.gameOver = true;
            this.showMessage(`Game over! The word was: ${this.currentWord}`, 'error');
        } else {
            this.currentRow++;
            this.currentCol = 0;
        }
    }
    
    isValidWord(word) {
        return this.words.includes(word) || word.length === 5;
    }
    
    checkGuess(guess) {
        const result = [];
        const wordArray = this.currentWord.split('');
        const guessArray = guess.split('');
        
        for (let i = 0; i < 5; i++) {
            if (guessArray[i] === wordArray[i]) {
                result[i] = 'correct';
            } else if (wordArray.includes(guessArray[i])) {
                result[i] = 'present';
            } else {
                result[i] = 'absent';
            }
        }
        
        for (let i = 0; i < 5; i++) {
            const cell = document.getElementById(`cell-${this.currentRow}-${i}`);
            setTimeout(() => {
                cell.classList.add('flip');
                cell.classList.add(result[i]);
            }, i * 100);
        }
    }
    
    updateKeyboard(guess) {
        const wordArray = this.currentWord.split('');
        
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i];
            const key = document.querySelector(`[data-key="${letter}"]`);
            
            if (!key) continue;
            
            if (letter === wordArray[i]) {
                key.classList.remove('present', 'absent');
                key.classList.add('correct');
            } else if (wordArray.includes(letter) && !key.classList.contains('correct')) {
                key.classList.remove('absent');
                key.classList.add('present');
            } else if (!key.classList.contains('correct') && !key.classList.contains('present')) {
                key.classList.add('absent');
            }
        }
    }
    
    showMessage(text, type = '') {
        const messageElement = document.getElementById('message');
        messageElement.textContent = text;
        messageElement.className = `message ${type}`;
        
        if (type === 'error') {
            setTimeout(() => {
                messageElement.textContent = '';
                messageElement.className = 'message';
            }, 2000);
        }
    }
    
    newGame() {
        this.currentWord = this.getRandomWord();
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameBoard = [];
        this.gameOver = false;
        this.won = false;
        
        this.initializeBoard();
        this.resetKeyboard();
        this.showMessage('New game started! Good luck!');
        
        console.log('New word:', this.currentWord);
    }
    
    resetKeyboard() {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            key.classList.remove('correct', 'present', 'absent');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new WordleGame();
    console.log('Current word:', game.currentWord);
});