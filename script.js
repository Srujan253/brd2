// Set the birthday date (YYYY, MM-1, DD, HH, MM, SS)
const birthdayDate = new Date(2025, 5, 27, 0, 0, 0); // December 25, 2024

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const difference = birthdayDate - now;

    if (difference <= 0) {
        // Birthday has arrived!
        document.getElementById('countdown').innerHTML = '<h2>Happy Birthday! 🎉</h2>';
        playBirthdayAnimation();
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Image Carousel
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
}

// Auto-advance carousel every 5 seconds
setInterval(nextSlide, 5000);

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Birthday Wishes Storage with Authentication
const wishForm = document.getElementById('wish-form');
const wishesList = document.getElementById('wishes-list');
const ADMIN_PASSKEY = '27@80888762';

// Load wishes from localStorage
function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('birthdayWishes')) || [];
    wishesList.innerHTML = '';
    wishes.forEach((wish, index) => {
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        wishCard.innerHTML = `
            <h3>${wish.name}</h3>
            <p>${wish.message}</p>
            <small>${new Date(wish.date).toLocaleDateString()}</small>
            <button class="delete-wish" data-index="${index}" style="display: none;">Delete</button>
        `;
        wishesList.appendChild(wishCard);
    });

    // Add delete functionality to buttons
    document.querySelectorAll('.delete-wish').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            deleteWish(index);
        });
    });
}

// Save wish to localStorage
wishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    const wishes = JSON.parse(localStorage.getItem('birthdayWishes')) || [];
    wishes.push({
        name,
        message,
        date: new Date().toISOString()
    });
    
    localStorage.setItem('birthdayWishes', JSON.stringify(wishes));
    loadWishes();
    wishForm.reset();
});

// Delete wish with authentication
function deleteWish(index) {
    const passkey = prompt('Enter passkey to delete wish:');
    if (passkey === ADMIN_PASSKEY) {
        const wishes = JSON.parse(localStorage.getItem('birthdayWishes')) || [];
        wishes.splice(index, 1);
        localStorage.setItem('birthdayWishes', JSON.stringify(wishes));
        loadWishes();
    } else {
        alert('Invalid passkey. Cannot delete wish.');
    }
}

// Add authentication button to show delete buttons
const authButton = document.createElement('button');
authButton.textContent = 'Admin Mode';
authButton.className = 'auth-button';
authButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
`;
document.body.appendChild(authButton);

authButton.addEventListener('click', () => {
    const passkey = prompt('Enter passkey:');
    if (passkey === ADMIN_PASSKEY) {
        document.querySelectorAll('.delete-wish').forEach(button => {
            button.style.display = 'block';
        });
        authButton.textContent = 'Admin Mode (Active)';
        authButton.style.backgroundColor = '#4ecdc4';
    } else {
        alert('Invalid passkey');
    }
});

// Load wishes when page loads
loadWishes();

// Birthday Animation
function playBirthdayAnimation() {
    // Create confetti effect
    const colors = ['#ff6b6b', '#ffd93d', '#4ecdc4', '#45b7d1', '#96ceb4'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
    }

    // Play birthday music
    const audio = new Audio('birthday-music.mp3');
    audio.play();
}

// Add confetti styles
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        top: -10px;
        animation: fall linear forwards;
        z-index: 1000;
    }

    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// =====================
// Tic-Tac-Toe Game Logic
// =====================
const tttStartBtn = document.getElementById('ttt-start');
const tttNicknameInput = document.getElementById('ttt-nickname');
const tttGameSection = document.getElementById('ttt-game');
const tttBoard = document.getElementById('ttt-board');
const tttStatus = document.getElementById('ttt-status');
const tttRestartBtn = document.getElementById('ttt-restart');
const tttLeaderboardList = document.getElementById('ttt-leaderboard-list');

let tttNickname = '';
let tttBoardState = Array(9).fill('');
let tttCurrentPlayer = 'X';
let tttGameActive = false;
let tttWinStreak = 0;

function renderBoard() {
    tttBoard.innerHTML = '';
    tttBoardState.forEach((cell, idx) => {
        const div = document.createElement('div');
        div.className = 'ttt-cell';
        div.textContent = cell;
        div.addEventListener('click', () => handleCellClick(idx));
        tttBoard.appendChild(div);
    });
}

function handleCellClick(idx) {
    if (!tttGameActive || tttBoardState[idx]) return;
    tttBoardState[idx] = tttCurrentPlayer;
    renderBoard();
    if (checkWinner(tttCurrentPlayer)) {
        tttStatus.textContent = `${tttNickname} (${tttCurrentPlayer}) wins!`;
        updateStreak(tttNickname, true);
        tttGameActive = false;
        tttRestartBtn.style.display = 'block';
    } else if (tttBoardState.every(cell => cell)) {
        tttStatus.textContent = `It's a draw!`;
        updateStreak(tttNickname, false);
        tttGameActive = false;
        tttRestartBtn.style.display = 'block';
    } else {
        tttCurrentPlayer = tttCurrentPlayer === 'X' ? 'O' : 'X';
        tttStatus.textContent = `Turn: ${tttCurrentPlayer}`;
    }
}

function checkWinner(player) {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diags
    ];
    return wins.some(pattern => pattern.every(idx => tttBoardState[idx] === player));
}

function startGame() {
    tttNickname = tttNicknameInput.value.trim() || 'Player';
    tttGameSection.style.display = 'block';
    tttNicknameInput.disabled = true;
    tttStartBtn.disabled = true;
    tttRestartBtn.style.display = 'none';
    tttBoardState = Array(9).fill('');
    tttCurrentPlayer = 'X';
    tttGameActive = true;
    tttStatus.textContent = `Turn: ${tttCurrentPlayer}`;
    renderBoard();
    loadLeaderboard();
}

tttStartBtn.addEventListener('click', startGame);
tttRestartBtn.addEventListener('click', () => {
    tttBoardState = Array(9).fill('');
    tttCurrentPlayer = 'X';
    tttGameActive = true;
    tttStatus.textContent = `Turn: ${tttCurrentPlayer}`;
    tttRestartBtn.style.display = 'none';
    renderBoard();
});

function updateStreak(nickname, won) {
    let leaderboard = JSON.parse(localStorage.getItem('tttLeaderboard')) || {};
    if (!leaderboard[nickname]) leaderboard[nickname] = 0;
    if (won) {
        leaderboard[nickname] += 1;
    } else {
        leaderboard[nickname] = 0;
    }
    localStorage.setItem('tttLeaderboard', JSON.stringify(leaderboard));
    loadLeaderboard();
}

function loadLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('tttLeaderboard')) || {};
    let sorted = Object.entries(leaderboard)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    tttLeaderboardList.innerHTML = '';
    sorted.forEach(([name, streak], idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${idx + 1}. ${name}</span><span>${streak} win${streak === 1 ? '' : 's'}</span>`;
        tttLeaderboardList.appendChild(li);
    });
}

// Show leaderboard on page load
loadLeaderboard(); 