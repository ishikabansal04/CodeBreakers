function game1(player, OPPONENT, LEVEL, firstPlayer) {
  // select canvas
  const canvas = document.getElementById("cvs");
  const ctx = canvas.getContext("2d");

  // board variables
  let board = [];
  const COLUMN = 3;
  const ROW = 3;
  const SPACE_SIZE = 183.3;

  //  array to storemoves of all players
  let gameData = new Array(9);

  // By default the first player to play is the human(man)
  let currentPlayer = player.man;

  //Human player is us
  let us = player.man;

  //timeout
  let time = 2000;

  //For winning line:
  let winningIndex;

  // load X & O images
  const xImage = new Image();
  xImage.src = "img/X.png";

  const oImage = new Image();
  oImage.src = "img/O.png";

  // Winning combinations
  const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
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
    for (let i = 1; i < ROW; i++) {
      BoardLine(SPACE_SIZE * i, 0, SPACE_SIZE * i, 550);
    }
    for (let i = 1; i < COLUMN; i++) {
      BoardLine(0, SPACE_SIZE * i, 550, SPACE_SIZE * i);
    }
  }

  drawBoard(); //Board is drawn

  //Function to select first player
  function selectPlayer1() {
    if (firstPlayer == "opp") {
      if (OPPONENT == "computer") {
        gameData[4] = player.computer;
        console.log(player.computer);
        console.log(gameData);
        let img = player.computer == "X" ? xImage : oImage;
        console.log(img.onload);
        img.onload = function () {
          ctx.drawImage(img, 204.8, 204.8);
        };
      } else {
        currentPlayer = player.friend;
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
        id = alphabeta(gameData, player.computer, -Infinity, +Infinity).id;
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
        setTimeout(showGameOver, time, "tie");
        GAME_OVER = true;
        return;
      }
    } else {
      // give turn to the other PLAYER
      currentPlayer = currentPlayer == player.man ? player.friend : player.man;
    }
  });

  //Naiive Algorithm
  function level1_algo(gameData, PLAYER) {
    let EMPTY_SPACES = getEmptySpaces(gameData);
    let id = EMPTY_SPACES[Math.floor(Math.random() * EMPTY_SPACES.length)];
    delete EMPTY_SPACES[id];
    return id;
  }
  //MAGIC SQUARE method
  function level2_algo(gameData, PLAYER) {
    let magicSq = [8, 1, 6, 3, 5, 7, 4, 9, 2];
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
    if (count == 2) {
      for (let i = 0; i < EMPTY_SPACE.length; i++) {
        if (15 - sum - magicSq[EMPTY_SPACE[i]] == 0) {
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
          if (15 - sum2 == magicSq[EMPTY_SPACE[x]]) {
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
        sum2 = 15 - sum2;
        for (x = 0; x < EMPTY_SPACE.length; x++) {
          if (15 - sum2 == magicSq[EMPTY_SPACE[x]]) {
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
  function alphabeta(gameData, PLAYER, alpha, beta) {
    // BASE
    if (isWinner(gameData, player.computer)) return { evaluation: +10 };
    if (isWinner(gameData, player.man)) return { evaluation: -10 };
    if (isTie(gameData)) return { evaluation: 0 };
    //  if( depth==3 ) return { evaluation : 0};

    // LOOK FOR EMpTY SPACES
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
          player.man,
          alpha,
          beta
        ).evaluation;
      } else {
        move.evaluation = alphabeta(
          gameData,
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
        }
        if (beta <= alpha) break;
      }
    } else {
      // MINIMIZER
      let bestEvaluation = +Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].evaluation < bestEvaluation) {
          bestEvaluation = moves[i].evaluation;
          bestMove = moves[i];
        }

        if (bestEvaluation > beta) {
          beta = bestEvaluation;
        }
        if (beta <= alpha) break;
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
    if (tuple[0] == 0 && tuple[2] == 8) {
      winnerLine(0, 0, 550, 550);
    } else if (tuple[0] == 2 && tuple[2] == 6) {
      winnerLine(550, 0, 0, 550);
    } else if (tuple[0] == 0 && tuple[2] == 6) {
      winnerLine(91.5, 0, 91.5, 550);
    } else if (tuple[0] == 1 && tuple[2] == 7) {
      winnerLine(274.8, 0, 274.8, 550);
    } else if (tuple[0] == 2 && tuple[2] == 8) {
      winnerLine(458.1, 0, 458.1, 550);
    } else if (tuple[0] == 0 && tuple[2] == 2) {
      winnerLine(0, 91.5, 550, 91.5);
    } else if (tuple[0] == 3 && tuple[2] == 5) {
      winnerLine(0, 274.8, 550, 274.8);
    } else if (tuple[0] == 6 && tuple[2] == 8) {
      winnerLine(0, 458.1, 550, 458.1);
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
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 5;
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
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Show game over function
  function showGameOver(player) {
    let message = player == "tie" ? "Oops No Winner" : "Boom! The Winner is";
    let imgSrc = `img/${player}.png`;
    let winner;
    if (player == "tie") {
      winner = "It's a tie!";
      SaveDataToLocalStorage(2);
    } else if (us == player) {
      winner = "Player One!";
      SaveDataToLocalStorage(1);
    } else {
      if (OPPONENT == "friend") {
        winner = "Player Two!";
      } else {
        winner = "Computer";
      }
      console.log("saving score");
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
    let img = player == "X" ? xImage : oImage;

    // the x,y positon of the image are the x,y of the clicked space
    ctx.drawImage(img, j * SPACE_SIZE + 15, i * SPACE_SIZE + 15);
  }
}
