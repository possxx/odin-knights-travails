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

function inbetweenMove(start, end, depth) {
  let queue = [];

  while (depth > 1) {
    if (!queue.length) {
      queue = possibleMoves(start);
      depth--;
      continue;
    }

    const newQueue = [];
    queue.forEach((item) => {
      possibleMoves(item).forEach((move) => newQueue.push(move));
    });

    queue = newQueue;
    depth--;
  }

  const newMoves = possibleMoves(end);

  return newMoves.filter((move) => {
    return JSON.stringify(queue).includes(move);
  });
}

function knightMoves(start, end) {
  let queue = possibleMoves(start);
  let depth = 0;
  let endFound = false;

  while (!endFound) {
    const newQueue = [];
    queue.forEach((item) => {
      if (item[0] === end[0] && item[1] === end[1]) endFound = true;
      possibleMoves(item).forEach((move) => newQueue.push(move));
    });

    queue = newQueue;
    depth += 1;
  }

  let allMoves = [start, end];
  let depthStore = depth;

  while (depth > 1) {
    const inbetweenMoves = inbetweenMove(start, end, depth);
    allMoves.splice(1, 0, inbetweenMoves[0]);
    depth--;
    end = inbetweenMoves[0];
  }

  console.log(`=> You made it in ${depthStore} moves! Here's your path:`);
  allMoves.forEach((move) => {
    console.log(move);
  });
}

knightMoves([0, 0], [3, 3]);
