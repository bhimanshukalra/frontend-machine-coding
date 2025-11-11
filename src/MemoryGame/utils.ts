export function generateGrid() {
  const list = Array.from({ length: 18 }, (_, index) => index + 1);
  const grid = [...list, ...list].sort(() => Math.random() - 0.5);
  const cards = grid.map((item, index) => ({
    id: index,
    number: item,
    isFlipped: false,
  }));
  return cards;
}
