const player = document.getElementById("player");
const goal = document.getElementById("goal");
const fakeArrow = document.getElementById("fakeArrow");
const hintBox = document.getElementById("hintBox");

let playerX = 10;
let playerY = 10;
const speed = 5;

// Place arrow somewhere misleading
let arrowX = 300;
let arrowY = 50;
fakeArrow.style.left = arrowX + "px";
fakeArrow.style.top = arrowY + "px";

// Easy walls
const walls = [
    {x: 150, y: 0, width: 10, height: 300},
    {x: 300, y: 200, width: 200, height: 10}
];

document.addEventListener("keydown", movePlayer);

function movePlayer(event) {
    let newX = playerX;
    let newY = playerY;

    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") newY -= speed;
    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") newY += speed;
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") newX -= speed;
    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") newX += speed;

    let collides = walls.some(wall =>
        newX < wall.x + wall.width &&
        newX + 20 > wall.x &&
        newY < wall.y + wall.height &&
        newY + 20 > wall.y
    );

    let insideBounds = newX >= 0 && newX <= 480 && newY >= 0 && newY <= 480;

    if (!collides && insideBounds) {
        playerX = newX;
        playerY = newY;
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
    }

    checkArrowHint();

    if (isWin()) {
        alert("🎉 You cleared Easy level!");
        window.location.href = "game.html";
    }
}

function isWin() {
    return playerX < goal.offsetLeft + 20 &&
           playerX + 20 > goal.offsetLeft &&
           playerY < goal.offsetTop + 20 &&
           playerY + 20 > goal.offsetTop;
}

function checkArrowHint() {
    let distance = Math.sqrt(
        Math.pow(playerX - arrowX, 2) + Math.pow(playerY - arrowY, 2)
    );

    if (distance < 40) {
        const messages = [
            "You’re about to win… trust me 😉",
            "Keep going this way… definitely!",
            "Victory is close… or maybe not!",
            "Follow me, I promise it’s safe 😏"
        ];
        hintBox.innerText = messages[Math.floor(Math.random() * messages.length)];
    } else {
        hintBox.innerText = "";
    }
}
