

const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Sound effects
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2579/2579-preview.mp3');
const winSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3');
const drawSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2593/2593-preview.mp3');

function startGame() {
    document.querySelector('.landing-page').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
    clickSound.play();

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (gameState[a] && 
            gameState[a] === gameState[b] && 
            gameState[a] === gameState[c]) {
            
            roundWon = true;
            combo.forEach(i => cells[i].classList.add('winning-cell'));
            break;
        }
    }

    if (roundWon) {
        status.innerHTML = `🎉 Player <span class="highlight">${currentPlayer}</span> wins! 🎉`;
        gameActive = false;
        winSound.play();
        return;
    }

    if (!gameState.includes('')) {
        status.textContent = 'Game Draw! 🤝';
        gameActive = false;
        drawSound.play();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerHTML = `Player <span class="highlight">${currentPlayer}</span>'s turn`;
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.innerHTML = `Player <span class="highlight">${currentPlayer}</span>'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winning-cell');
    });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

// Initial game status
status.innerHTML = `Player <span class="highlight">${currentPlayer}</span>'s turn`;
