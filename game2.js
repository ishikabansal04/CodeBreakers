function game2(player, OPPONENT, LEVEL, firstPlayer) {
  // select canvas
  const canvas = document.getElementById("cvs");
  const ctx = canvas.getContext("2d");

  // board variables
  let board = [];
  const COLUMN = 5;
  const ROW = 5;
  const SPACE_SIZE = 110;

  //  array to storemoves of all players
  let gameData = new Array(25);

  // By default the first player to play is the human(man)
  let currentPlayer = player.man;

  //Human player is us
  let us = player.man;

  //timeout
  let time = 2000;

  //For winning line:
  let winningIndex;

  // load X & O images
  const x2Image = new Image();
  x2Image.src = "img/X2.png";

  const o2Image = new Image();
  o2Image.src = "img/O2.png";

  // Winning combinations
  const COMBOS = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];

  // to check game over
  let GAME_OVER = false;

  // Function to draw the board
  function drawBoard() {
    // We give every space a unique id
    // So we know exactly where to put the player's move on the gameData Array
    let id = 0;
    for (let i = 0; i < ROW; i++) {
      board[i] = [];
      for (let j = 0; j < COLUMN; j++) {
        board[i][j] = id;
        id++;
      }
    }
    for (let i = 1; i < 5; i++) {
      BoardLine(SPACE_SIZE * i, 0, SPACE_SIZE * i, 550);
    }
    for (let i = 1; i < 5; i++) {
      BoardLine(0, SPACE_SIZE * i, 550, SPACE_SIZE * i);
    }
  }

  drawBoard(); //Board is drawn

  //Function to select first player
  function selectPlayer1() {
    if (firstPlayer == "opp") {
      if (OPPONENT == "computer") {
        gameData[12] = player.computer;
        console.log(player.computer);
        console.log(gameData);
        let img = player.computer == "X" ? x2Image : o2Image;
        console.log(img.onload);
        // the x,y positon of the image are the x,y of the clicked space
        img.onload = function () {
          ctx.drawImage(img, 234, 234);
        };
      }
    }
  }

  selectPlayer1(); //FirstPlayer is selected

  // On player's click
  canvas.addEventListener("click", function (event) {
    // If it's A GAME OVER? EXIT
    if (GAME_OVER) return;

    // X & Y position of mouse click relative to the canvas
    let X = event.clientX - canvas.getBoundingClientRect().x;
    let Y = event.clientY - canvas.getBoundingClientRect().y;

    // WE CALCULATE i & j of the clicked SPACE
    let i = Math.floor(Y / SPACE_SIZE);
    let j = Math.floor(X / SPACE_SIZE);

    // Get the id of the space the player clicked on
    let id = board[i][j];

    // Prevent the player to play the same space twice
    if (gameData[id]) return;

    // store the player's move to gameData
    gameData[id] = currentPlayer;

    // draw the move on board
    drawOnBoard(currentPlayer, i, j);

    // Check if the play wins
    if (isWinner(gameData, currentPlayer)) {
      determineWinningLineCoordinates();
      setTimeout(showGameOver, time, currentPlayer);
      GAME_OVER = true;
      return;
    }

    // check if it's a tie game
    if (isTie(gameData)) {
      setTimeout(showGameOver, time, "tie");
      GAME_OVER = true;
      return;
    }

    if (OPPONENT == "computer") {
      // get id of space using appropriate algorithm
      if (LEVEL == 1) {
        id = level1_algo(gameData, player.computer);
      } else if (LEVEL == 2) {
        id = level2_algo(gameData, player.computer);
      } else if (LEVEL == 3) {
        id = alphabeta(gameData, 0, player.computer, -Infinity, +Infinity).id;
      }

      // store the player's move to gameData
      gameData[id] = player.computer;

      // get i and j of space
      let space = getIJ(id);

      // draw the move on board
      drawOnBoard(player.computer, space.i, space.j);

      // Check if the play wins
      if (isWinner(gameData, player.computer)) {
        determineWinningLineCoordinates();
        setTimeout(showGameOver, time, player.computer);
        GAME_OVER = true;
        return;
      }

      // check if it's a tie game
      if (isTie(gameData)) {
        setTimeout(showGameOver,time, "tie");
        GAME_OVER = true;
        return;
      }
    } else {
      //  give turn to the other PLAYER
      currentPlayer = currentPlayer == player.man ? player.friend : player.man;
    }
  });

  //Naiive Algorithm
  function level1_algo(gameData, PLAYER) {
    let EMPTY_SPACE = getEmptySpaces(gameData);
    let id = EMPTY_SPACE[Math.floor(Math.random() * EMPTY_SPACE.length)];
    delete EMPTY_SPACE[id];
    return id;
  }

  //MAGIC SQUARE METHOD
  function level2_algo(gameData, PLAYER) {
    let magicSq = [
      22,
      18,
      3,
      2,
      20,
      7,
      16,
      9,
      14,
      19,
      5,
      11,
      13,
      15,
      21,
      25,
      12,
      17,
      10,
      1,
      6,
      8,
      23,
      24,
      4,
    ];
    let sum = 0;
    let id = -1;
    let count = 0;
    for (let i = 0; i < gameData.length; i++) {
      if (gameData[i] == us) {
        sum = sum + magicSq[i];
        count++;
      }
    }
    let EMPTY_SPACE = getEmptySpaces(gameData);
    if (count == 4) {
      for (let i = 0; i < EMPTY_SPACE.length; i++) {
        if (65 - sum - magicSq[EMPTY_SPACE[i]] == 0) {
          id = EMPTY_SPACE[i];
          delete EMPTY_SPACE[i];
          break;
        }
      }
    } else {
      let sum2 = 0;
      for (let j = 0; j < gameData.length; j++) {
        if (gameData[j] == us) {
          sum2 = sum - magicSq[j];
        }
        for (x = 0; x < EMPTY_SPACE.length; x++) {
          if (65 - sum2 == magicSq[EMPTY_SPACE[x]]) {
            id = EMPTY_SPACE[x];
            delete EMPTY_SPACE[x];
            break;
          }
        }
        if (id != -1) {
          break;
        }
      }
    }
    if (id == -1) {
      let sum2 = 0;
      for (let j = 0; j < gameData.length; j++) {
        if (gameData[j] == us) {
          sum2 = sum - magicSq[j];
        }
        for (x = 0; x < EMPTY_SPACE.length; x++) {
          if (65 - sum2 == magicSq[EMPTY_SPACE[x]]) {
            id = EMPTY_SPACE[x];
            delete EMPTY_SPACE[x];
            break;
          }
        }
        if (id != -1) {
          break;
        }
      }
      if (id == -1) {
        id = EMPTY_SPACE[0];
        delete EMPTY_SPACE[0];
      }
    }
    return id;
  }
  //Alpha-Beta Pruning Algorithm
  function alphabeta(gameData, depth, PLAYER, alpha, beta) {
    // BASE
    if (isWinner(gameData, player.computer)) return { evaluation: +10 };
    if (isWinner(gameData, player.man)) return { evaluation: -10 };
    if (isTie(gameData)) return { evaluation: 0 };
    if (depth == 3) return { evaluation: 10 };
    // LOOK FOR EMTY SPACES
    let EMPTY_SPACES = getEmptySpaces(gameData);

    // SAVE ALL MOVES AND THEIR EVALUATIONS
    let moves = [];

    // LOOP OVER THE EMPTY SPACES TO EVALUATE THEM
    for (let i = 0; i < EMPTY_SPACES.length; i++) {
      // GET THE ID OF THE EMPTY SPACE
      let id = EMPTY_SPACES[i];

      // BACK UP THE SPACE
      let backup = gameData[id];

      // MAKE THE MOVE FOR THE PLAYER
      gameData[id] = PLAYER;

      // SAVE THE MOVE'S ID AND EVALUATION
      let move = {};

      move.id = id;

      // THE MOVE EVALUATION
      if (PLAYER == player.computer) {
        move.evaluation = alphabeta(
          gameData,
          depth + 1,
          player.man,
          alpha,
          beta
        ).evaluation;
      } else {
        move.evaluation = alphabeta(
          gameData,
          depth + 1,
          player.computer,
          alpha,
          beta
        ).evaluation;
      }

      // RESTORE SPACE
      gameData[id] = backup;

      // SAVE MOVE TO MOVES ARRAY
      moves.push(move);
    }

    // MINIMAX ALGORITHM
    let bestMove;

    if (PLAYER == player.computer) {
      // MAXIMIZER
      let bestEvaluation = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].evaluation > bestEvaluation) {
          bestEvaluation = moves[i].evaluation;
          bestMove = moves[i];
        }
        if (bestEvaluation > alpha) {
          alpha = bestEvaluation;
        } else if (beta <= alpha) break;
      }
    } else {
      // MINIMIZER
      let bestEvaluation = +Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].evaluation < bestEvaluation) {
          bestEvaluation = moves[i].evaluation;
          bestMove = moves[i];
        }

        if (bestEvaluation < beta) {
          beta = bestEvaluation;
        } else if (beta <= alpha) break;
      }
    }

    return bestMove;
  }

  // GET EMPTY SPACES
  function getEmptySpaces(gameData) {
    let EMPTY = [];

    for (let id = 0; id < gameData.length; id++) {
      if (!gameData[id]) EMPTY.push(id);
    }

    return EMPTY;
  }

  // GET i AND j of a SPACE
  function getIJ(id) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == id) return { i: i, j: j };
      }
    }
  }

  // check for a winner
  function isWinner(gameData, player) {
    for (let i = 0; i < COMBOS.length; i++) {
      let won = true;

      for (let j = 0; j < COMBOS[i].length; j++) {
        let id = COMBOS[i][j];
        won = gameData[id] == player && won;
      }

      if (won) {
        winningIndex = i;
        return true;
      }
    }
    return false;
  }

  // Check for a tie game
  function isTie(gameData) {
    let isBoardFill = true;
    for (let i = 0; i < gameData.length; i++) {
      isBoardFill = gameData[i] && isBoardFill;
    }
    if (isBoardFill) {
      return true;
    }
    return false;
  }

  //Function to determine the winning line coordinates
  function determineWinningLineCoordinates() {
    let tuple = COMBOS[winningIndex];
    if (tuple[0] == 0 && tuple[4] == 24) {
      winnerLine(0, 0, 550, 550);
    } else if (tuple[0] == 4 && tuple[4] == 20) {
      winnerLine(550, 0, 0, 550);
    } else if (tuple[0] == 0 && tuple[4] == 20) {
      winnerLine(55, 0, 55, 550);
    } else if (tuple[0] == 1 && tuple[4] == 21) {
      winnerLine(165, 0, 165, 550);
    } else if (tuple[0] == 2 && tuple[4] == 22) {
      winnerLine(275, 0, 275, 550);
    } else if (tuple[0] == 3 && tuple[4] == 23) {
      winnerLine(385, 0, 385, 550);
    } else if (tuple[0] == 4 && tuple[4] == 24) {
      winnerLine(495, 0, 495, 550);
    } else if (tuple[0] == 0 && tuple[4] == 4) {
      winnerLine(0, 55, 550, 55);
    } else if (tuple[0] == 5 && tuple[4] == 9) {
      winnerLine(0, 165, 550, 165);
    } else if (tuple[0] == 10 && tuple[4] == 14) {
      winnerLine(0, 275, 550, 275);
    } else if (tuple[0] == 15 && tuple[4] == 19) {
      winnerLine(0, 385, 550, 385);
    } else if (tuple[0] == 20 && tuple[4] == 24) {
      winnerLine(0, 495, 550, 495);
    }
  }

  //Function to draw winner line
  function winnerLine(i1, j1, i2, j2) {
    ctx.beginPath();
    ctx.moveTo(i1, j1);
    ctx.lineTo(i2, j2);
    var gradient = ctx.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "green");
    // Fill with gradient
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  //Function to draw the lines of the tic tac toe board
  function BoardLine(i1, j1, i2, j2) {
    ctx.beginPath();
    ctx.moveTo(i1, j1);
    ctx.lineTo(i2, j2);
    var gradient = ctx.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("1.0", "black");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Show game over function
  function showGameOver(player) {
    let message = player == "tie" ? "Oops No Winner" : "Boom! The Winner is";
    let imgSrc = `img/${player}.png`;
    let winner;
    if (player == "tie") {
      winner = "It's a tie!";
      SaveDataToLocalStorage(0);
    } else if (us == player) {
      winner = "Player One!";
      SaveDataToLocalStorage(1);
    } else {
      if (OPPONENT == "friend") {
        winner = "Player Two!";
      } else {
        winner = "Computer";
      }
      SaveDataToLocalStorage(0);
    }
    gameOverElement.innerHTML = `
            <h2>${message}<h2><br>
            <h4>${winner}<h4>
            <img class="winner-img" src=${imgSrc} </img>
            <div class="play" onclick="location.reload()">Play Again!</div>
        `;
    gameOverElement.classList.remove("hide");
    c.classList.add("hide");
    frndcam.classList.add("hide");
    Robot.classList.add("hide");
  }

  // draw moves on the board
  function drawOnBoard(player, i, j) {
    let img = player == "X" ? x2Image : o2Image;

    // the x,y positon of the image are the x,y of the clicked space
    ctx.drawImage(img, j * SPACE_SIZE + 15, i * SPACE_SIZE + 15);
  }
}
