function possibleMoves(position) {
  const allMoves = [];

  let x = position[0];
  let y = position[1];

  allMoves.push(
    [x - 1, y - 2],
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x - 1, y + 2],
    [x + 1, y + 2],
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x + 1, y - 2]
  );

  return allMoves.filter((move) => {
    let x = move[0];
    let y = move[1];

    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  });
}

function knightMoves(start, end) {
  const queue = [[start]];
  const visitedSqu = new Set();

  while (queue.length) {
    const path = queue.shift();
    const currDepth = path.length - 1;

    if (
      path[path.length - 1][0] === end[0] &&
      path[path.length - 1][1] === end[1]
    ) {
      console.log(`You made it in ${currDepth} moves! Here's your path:`);
      console.log(path);
      break;
    }

    for (const move of possibleMoves(path[path.length - 1])) {
      if (!visitedSqu.has(move)) {
        queue.push([...path, move]);
        visitedSqu.add(move);
      }
    }
  }
}

knightMoves([0, 0], [7, 7]);
