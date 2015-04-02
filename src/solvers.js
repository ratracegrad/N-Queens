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

window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n:n});

  findSolution(0, n, board, "hasAnyRooksConflicts", function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

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