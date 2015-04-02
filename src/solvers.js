/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined;
  var board = new Board({n:n});

  findSolution(0, n, board, "hasAnyRooksConflicts", function() {
    solution = _.map(board.rows(), function(row) {
      return row.slice();
    });
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};
  // var board = new Board({n:n});
  // var solution = []; 


  // function findRooks(pieces){
  //   var resultArray = [];
  //   // break out of recursive function - base case
  //   // if (pieces === 0) {
  //   //   return board.rows();
  //   // }

  //   // recursive piece
  //   for (var i=0; i<n; i++){
  //     for (var j=0; j <n; j++) {
  //       if (!board[i][j]) {
  //         board.togglePiece(i, j);
  //         if (!board.hasAnyRooksConficts()){
  //           if (pieces > 0) {
  //             pieces--;
  //             // update board
  //             return findRooks(pieces);
  //           }
  //         } else {
  //           board.togglePiece(i, j);
  //           }
  //         }
  //       }
  //     }
  //     if (pieces === 0){
  //   resultArray.push(board);
  // }
  // return resultArray;
  // }
  
  // solution = findRooks(n);

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
// };



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n:n});

  findSolution(0, n, board, "hasAnyRooksConflicts", function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var solution = board.rows(); 

  findSolution(0, n, board, "hasAnyQueensConflicts", function() {
    solution = _.map(board.rows(), function(row) {
      return row.slice();
    });
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n:n});

  findSolution(0, n, board, "hasAnyQueensConflicts", function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.findSolution = function(row, n, board, validator, callback) {

  if (row === n) {
    callback();
    return;
  }

  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if( !board[validator]() ) {
      findSolution(row + 1,n, board, validator, callback);
    }
    board.togglePiece(row, i);
  }

};