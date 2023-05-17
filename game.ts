const gridSize = { width: 20, height: 10 };
const player = { x: 9, y: 4 };
const playerChar = "@";
const floorChar = ".";
const gameContainer = document.getElementById("game-container")!;

const generate2dArray = (width: number, height: number): string[][] =>
  Array.from({ length: height }, () =>
    Array.from({ length: width }, () => floorChar)
  );

const grid: string[][] = generate2dArray(gridSize.width, gridSize.height);

const renderGrid = (gameElement: HTMLElement) =>
  (gameElement.textContent = grid.map((row) => row.join("")).join("\n"));

const render = () => {
  drawPlayer(player.x, player.y);
  renderGrid(gameContainer);
};

const draw = (x: number, y: number, char: string) => (grid[y][x] = char);

const drawPlayer = (x: number, y: number) => draw(x, y, playerChar);

const movePlayer = (direction: { x: number; y: number }): void => {
  const newX = player.x + direction.x;
  const newY = player.y + direction.y;

  if (
    newX >= 0 &&
    newX < gridSize.width &&
    newY >= 0 &&
    newY < gridSize.height
  ) {
    draw(player.x, player.y, floorChar);
    player.x = newX;
    player.y = newY;
    render();
  }
};

document.addEventListener("keydown", (event: KeyboardEvent): void => {
  const key = event.key.toLowerCase();
  const directions: { [key: string]: { x: number; y: number } } = {
    h: { x: -1, y: 0 },
    j: { x: 0, y: 1 },
    k: { x: 0, y: -1 },
    l: { x: 1, y: 0 },
  };

  if (directions.hasOwnProperty(key)) movePlayer(directions[key]);
});

render();
