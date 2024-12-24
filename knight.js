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

  let depthStore = depth;
  let allMoves = [];

  while (depth > 1) {
    let newMoves = [];

    if (!allMoves.length) {
      const inbetweenMoves = inbetweenMove(start, end, depth);

      inbetweenMoves.forEach((move) => {
        newMoves.splice(0, 0, [start, move, end]);
      });
      depth--;
      allMoves = newMoves;
      continue;
    }

    allMoves.forEach((move, index) => {
      let end = move[1];
      const inbetweenMoves = inbetweenMove(start, end, depth);

      inbetweenMoves.forEach((move) => {
        let currentMove = allMoves[index].slice();
        currentMove.splice(1, 0, move);
        newMoves.push(currentMove);
      });
    });

    allMoves = newMoves;
    depth--;
  }

  if (!allMoves.length) {
    console.log(`You made it in 1 move! Here's your path:`);
    console.log([start, end]);
  } else {
    console.log(
      `You made it in ${depthStore} moves! There are ${allMoves.length} paths with that number of moves:`
    );
    allMoves.forEach((path) => {
      console.log(path);
    });
  }
}

knightMoves([3, 3], [4, 3]);
