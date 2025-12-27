// Game Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game State
let gameRunning = false;
let score = 0;
let coins = 0;
let distance = 0;
let gameSpeed = 5;
let frameCount = 0;

// Player Object
const player = {
    x: 200,
    y: 450,
    width: 40,
    height: 60,
    lane: 1,
    jumping: false,
    sliding: false,
    velocityY: 0,
    gravity: 0.8,
    jumpPower: -15,
    color: '#FF6B6B',
    hasShield: false,
    shieldTime: 0
};

// Lane positions
const lanes = [150, 300, 450];

// Arrays for game objects
let obstacles = [];
let coinItems = [];
let powerUps = [];

// Obstacle types
const obstacleTypes = [
    { type: 'box', width: 50, height: 50, color: '#8B4513' },
    { type: 'barrier', width: 60, height: 80, color: '#654321' },
    { type: 'spike', width: 40, height: 30, color: '#FF4444' }
];

// Power-up types
const powerUpTypes = [
    { type: 'shield', color: '#4ECDC4', duration: 300 },
    { type: 'magnet', color: '#FFD93D', duration: 400 },
    { type: 'boost', color: '#95E1D3', duration: 200 }
];

// Key states
const keys = {};

// Event Listeners
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    
    if (gameRunning) {
        if ((e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') && !player.jumping && !player.sliding) {
            player.jumping = true;
            player.velocityY = player.jumpPower;
        }
        if ((e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') && !player.jumping) {
            player.sliding = true;
            setTimeout(() => { player.sliding = false; }, 500);
        }
        if ((e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') && player.lane > 0) {
            player.lane--;
        }
        if ((e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') && player.lane < 2) {
            player.lane++;
        }
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    gameRunning = true;
    score = 0;
    coins = 0;
    distance = 0;
    gameSpeed = 5;
    obstacles = [];
    coinItems = [];
    powerUps = [];
    player.lane = 1;
    player.jumping = false;
    player.sliding = false;
    player.velocityY = 0;
    player.hasShield = false;
    gameLoop();
}

function restartGame() {
    document.getElementById('gameOverScreen').style.display = 'none';
    startGame();
}

function spawnObstacle() {
    if (Math.random() < 0.02) {
        const obstacleType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        const lane = Math.floor(Math.random() * 3);
        obstacles.push({
            x: canvas.width,
            y: obstacleType.type === 'spike' ? 520 : 500,
            width: obstacleType.width,
            height: obstacleType.height,
            color: obstacleType.color,
            type: obstacleType.type,
            lane: lane
        });
    }
}

function spawnCoin() {
    if (Math.random() < 0.03) {
        const lane = Math.floor(Math.random() * 3);
        const yPos = Math.random() < 0.5 ? 450 : 350;
        coinItems.push({
            x: canvas.width,
            y: yPos,
            width: 30,
            height: 30,
            lane: lane,
            collected: false
        });
    }
}

function spawnPowerUp() {
    if (Math.random() < 0.005) {
        const powerUpType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        const lane = Math.floor(Math.random() * 3);
        powerUps.push({
            x: canvas.width,
            y: 450,
            width: 35,
            height: 35,
            lane: lane,
            type: powerUpType.type,
            color: powerUpType.color,
            duration: powerUpType.duration
        });
    }
}

function updatePlayer() {
    const targetX = lanes[player.lane];
    player.x += (targetX - player.x) * 0.2;
    if (player.jumping) {
        player.velocityY += player.gravity;
        player.y += player.velocityY;
        if (player.y >= 450) {
            player.y = 450;
            player.jumping = false;
            player.velocityY = 0;
        }
    }
    if (player.hasShield) {
        player.shieldTime--;
        if (player.shieldTime <= 0) {
            player.hasShield = false;
        }
    }
}

function drawPlayer() {
    ctx.save();
    if (player.hasShield) {
        ctx.strokeStyle = '#4ECDC4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(player.x + player.width / 2, player.y + player.height / 2, 40, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.fillStyle = player.color;
    const playerHeight = player.sliding ? player.height / 2 : player.height;
    const playerY = player.sliding ? player.y + player.height / 2 : player.y;
    ctx.fillRect(player.x, playerY, player.width, playerHeight);
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x + 10, playerY + 15, 5, 5);
    ctx.fillRect(player.x + 25, playerY + 15, 5, 5);
    ctx.restore();
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= gameSpeed;
        ctx.fillStyle = obstacles[i].color;
        const obstacleX = lanes[obstacles[i].lane];
        ctx.fillRect(obstacleX - 25, obstacles[i].y, obstacles[i].width, obstacles[i].height);
        if (checkCollision(player, obstacles[i], obstacleX)) {
            if (player.hasShield) {
                player.hasShield = false;
                obstacles.splice(i, 1);
            } else {
                gameOver();
            }
        }
        if (obstacles[i] && obstacles[i].x < -100) {
            obstacles.splice(i, 1);
            score += 10;
        }
    }
}

function updateCoins() {
    for (let i = coinItems.length - 1; i >= 0; i--) {
        coinItems[i].x -= gameSpeed;
        if (!coinItems[i].collected) {
            ctx.fillStyle = '#FFD700';
            ctx.strokeStyle = '#FFA500';
            ctx.lineWidth = 2;
            const coinX = lanes[coinItems[i].lane];
            ctx.beginPath();
            ctx.arc(coinX, coinItems[i].y, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            if (checkCoinCollision(player, coinItems[i], coinX)) {
                coinItems[i].collected = true;
                coins++;
                score += 5;
            }
        }
        if (coinItems[i].x < -50) {
            coinItems.splice(i, 1);
        }
    }
}

function updatePowerUps() {
    for (let i = powerUps.length - 1; i >= 0; i--) {
        powerUps[i].x -= gameSpeed;
        ctx.fillStyle = powerUps[i].color;
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        const powerUpX = lanes[powerUps[i].lane];
        ctx.fillRect(powerUpX - 17, powerUps[i].y, 35, 35);
        ctx.strokeRect(powerUpX - 17, powerUps[i].y, 35, 35);
        if (checkCoinCollision(player, powerUps[i], powerUpX)) {
            activatePowerUp(powerUps[i]);
            powerUps.splice(i, 1);
        }
        if (powerUps[i] && powerUps[i].x < -50) {
            powerUps.splice(i, 1);
        }
    }
}

function activatePowerUp(powerUp) {
    if (powerUp.type === 'shield') {
        player.hasShield = true;
        player.shieldTime = powerUp.duration;
    } else if (powerUp.type === 'magnet') {
        coins += 5;
        score += 25;
    } else if (powerUp.type === 'boost') {
        gameSpeed += 3;
        setTimeout(() => { gameSpeed -= 3; }, 3000);
    }
}

function checkCollision(player, obstacle, obstacleX) {
    const playerWidth = player.width;
    const playerHeight = player.sliding ? player.height / 2 : player.height;
    const playerY = player.sliding ? player.y + player.height / 2 : player.y;
    return player.x < obstacleX + obstacle.width - 25 &&
           player.x + playerWidth > obstacleX - 25 &&
           playerY < obstacle.y + obstacle.height &&
           playerY + playerHeight > obstacle.y;
}

function checkCoinCollision(player, item, itemX) {
    return Math.abs(player.x + player.width / 2 - itemX) < 30 &&
           Math.abs(player.y + player.height / 2 - item.y) < 40;
}

function drawBackground() {
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, 400);
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(0, 550, canvas.width, 50);
    ctx.fillStyle = '#A0826D';
    ctx.fillRect(0, 400, canvas.width, 150);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    for (let i = 0; i < 3; i++) {
        const offset = (frameCount * gameSpeed) % 20;
        ctx.beginPath();
        ctx.moveTo(lanes[i], 400 - offset);
        ctx.lineTo(lanes[i], 550);
        ctx.stroke();
    }
    ctx.setLineDash([]);
}

function updateUI() {
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('coins').textContent = `Coins: ${coins}`;
    document.getElementById('distance').textContent = `Distance: ${distance}m`;
}

function gameOver() {
    gameRunning = false;
    document.getElementById('gameOverScreen').style.display = 'block';
    document.getElementById('finalScore').textContent = `Final Score: ${score}`;
    document.getElementById('finalCoins').textContent = `Coins Collected: ${coins}`;
}

function gameLoop() {
    if (!gameRunning) return;
    frameCount++;
    distance = Math.floor(frameCount / 10);
    if (frameCount % 300 === 0) {
        gameSpeed += 0.5;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    updatePlayer();
    drawPlayer();
    updateObstacles();
    updateCoins();
    updatePowerUps();
    spawnObstacle();
    spawnCoin();
    spawnPowerUp();
    updateUI();
    requestAnimationFrame(gameLoop);
}

console.log('Endless Runner Game Loaded!');
