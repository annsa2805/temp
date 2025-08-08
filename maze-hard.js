const player = document.getElementById("player");
const goal = document.getElementById("goal");

let playerX = 10;
let playerY = 10;
const speed = 5;

// Hard walls
const walls = [
    {x: 80, y: 0, width: 10, height: 400},
    {x: 160, y: 100, width: 10, height: 400},
    {x: 240, y: 0, width: 10, height: 400},
    {x: 320, y: 100, width: 10, height: 400},
    {x: 0, y: 200, width: 400, height: 10},
    {x: 100, y: 400, width: 400, height: 10}
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

    if (isWin()) {
        alert("🎉 You conquered the Hard level!");
        window.location.href = "game.html";
    }
}

function isWin() {
    return playerX < goal.offsetLeft + 20 &&
           playerX + 20 > goal.offsetLeft &&
           playerY < goal.offsetTop + 20 &&
           playerY + 20 > goal.offsetTop;
}
