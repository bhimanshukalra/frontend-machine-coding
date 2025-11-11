export function checkWinner(board: string[][]) {
  // Check rows
  const rowsResult = checkRows(board);
  if (rowsResult) {
    return rowsResult;
  }

  // Check cols
  const colsResult = checkCols(board);
  if (colsResult) {
    return colsResult;
  }

  // Check cols
  const primaryDiagonalResult = checkPrimaryDiagonal(board);
  if (primaryDiagonalResult) {
    return primaryDiagonalResult;
  }

  // Check cols
  const antiDiagonalResult = checkAntiDiagonal(board);
  if (antiDiagonalResult) {
    return antiDiagonalResult;
  }

  return null;
}

function checkRows(board: string[][]) {
  for (let i = 0; i < board.length; i++) {
    const symbol = board[i][0];
    if (symbol) {
      let winner = true;
      for (let j = 1; j < board.length; j++) {
        if (symbol != board[i][j]) {
          winner = false;
          break;
        }
      }
      if (winner) {
        return symbol;
      }
    }
  }

  return null;
}

function checkCols(board: string[][]) {
  for (let j = 0; j < board.length; j++) {
    const symbol = board[0][j];
    if (symbol) {
      let winner = true;
      for (let i = 1; i < board.length; i++) {
        if (symbol != board[i][j]) {
          winner = false;
          break;
        }
      }
      if (winner) {
        return symbol;
      }
    }
  }

  return null;
}

function checkPrimaryDiagonal(board: string[][]) {
  const symbol = board[0][0];
  if (symbol) {
    let winner = true;
    for (let i = 1; i < board.length; i++) {
      if (symbol != board[i][i]) {
        winner = false;
        break;
      }
    }
    if (winner) {
      return symbol;
    }
  }

  return null;
}

function checkAntiDiagonal(board: string[][]) {
  const symbol = board[0][board.length - 1];
  if (symbol) {
    let winner = true;
    for (let i = 1; i < board.length; i++) {
      if (symbol != board[i][board.length - 1 - i]) {
        winner = false;
        break;
      }
    }
    if (winner) {
      return symbol;
    }
  }

  return null;
}
