// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    // time complexity is O(n) - linear
    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;

      for (var i = 0; i < row.length; i++) {
        count += row[i];
      }

      return count > 1 ? true : false;      
    },

    hasAnyRowConflicts: function() {
      var allRows  = this.rows();
      var count = 0;

      for (var i=0; i<allRows.length; i++){
        if (this.hasRowConflictAt(i)){
          count ++;
        }
      }

      return count > 0 ? true : false;
   },

    hasColConflictAt: function(colIndex) {
      var allRows = this.rows();
      var count = 0;

      for (var i=0; i<allRows.length; i++){
        count += allRows[i][colIndex];
      };

      return count > 1 ? true: false;
    },

    hasAnyColConflicts: function() {
      var n = this.get('n');
      var count = 0;

      for (var i = 0; i < n; i ++) {
        if (this.hasColConflictAt(i)) {
          count++;
        }
      }

      return (count > 0) ? true : false;
    },


    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');
      var allRows = this.rows();
      var col = majorDiagonalColumnIndexAtFirstRow;
      var count = 0;

      for (var row = 0; row < n ; row++) {
        if (col >= 0) {
          if (allRows[row][col] === 1) {
            count++;
            if (count > 1) {
              return true;
            }
          }
        }
        
        col++;
      }

      return (count > 1) ? true : false;

    },

    hasAnyMajorDiagonalConflicts: function() {
      var n = this.get('n');
      var start = -n + 1;

      for(var col = start; col < n; col++){
        if(this.hasMajorDiagonalConflictAt(col)){
          return true;
        }
      }

      return false;

    },

     hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');
      var allRows = this.rows();
      var col = minorDiagonalColumnIndexAtFirstRow;
      var count = 0;

      for (var row = 0; row < n ; row++) {
        if (col < n) {
          if (allRows[row][col] === 1) {
            count++;
            if (count > 1) {
              return true;
            }
          }
        }
        
        col--;
      }

      return false;
      
    },

    hasAnyMinorDiagonalConflicts: function() {
      var n = this.get('n');
      var start = (n*2)- 1;

      for(var col = start; col >= 0; col--){
        if(this.hasMinorDiagonalConflictAt(col)){
          return true;
        }
      }

      return false;

    }

  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
