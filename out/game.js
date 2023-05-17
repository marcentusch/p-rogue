"use strict";
const gridSize = { width: 20, height: 10 };
const player = { x: 9, y: 4 };
const generate2dArray = (width, height) => Array.from({ length: height }, () => Array.from({ length: width }, () => "•"));
const grid = generate2dArray(gridSize.width, gridSize.height);
const renderGrid = (gameElement) => (gameElement.textContent = grid.map((row) => row.join("")).join("\n"));
const draw = (x, y, char) => (grid[y][x] = char);
const drawPlayer = (x, y) => draw(x, y, "@");
const gameContainer = document.getElementById("game-container");
drawPlayer(player.x, player.y);
renderGrid(gameContainer);
const movePlayer = (direction) => {
    const newX = player.x + direction.x;
    const newY = player.y + direction.y;
    if (newX >= 0 &&
        newX < gridSize.width &&
        newY >= 0 &&
        newY < gridSize.height) {
        draw(player.x, player.y, "•");
        player.x = newX;
        player.y = newY;
        drawPlayer(player.x, player.y);
        renderGrid(gameContainer);
    }
};
document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const directions = {
        h: { x: -1, y: 0 },
        j: { x: 0, y: 1 },
        k: { x: 0, y: -1 },
        l: { x: 1, y: 0 },
    };
    if (directions.hasOwnProperty(key))
        movePlayer(directions[key]);
});
