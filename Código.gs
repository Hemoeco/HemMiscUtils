//
// (2023) Hemoeco Renta
// Misc Utils - Use it as library on your projects
//
////////////////////////////////////////////////////

function findColNum(sheet, colName, titles = null, rowTitle = 1) {
  // Search column name, then return it's corresponding row number (zero based)

  let cols = sheet.getLastColumn(); 

  // get titles only if not already loaded
  titles = titles || sheet.getSheetValues(rowTitle, 1, 1, cols); // Get all titles

  // console.log(titles);
  
  let indiceFila; // En el ciclo for, se hace la sumatoria que dará el índice buscado.
  Logger.log('colName: ' + colName);
  
  for (let i = 0; i < cols; ++i) {
    if (titles[0][i] == colName) {
      return { found: true, index: i, titles };
    }
  }
}

/***
 * returns row number if found (zero based). undefined if not found
 *  */
function findRowForValueInCol(sheet, searchValue, colNum, searchRange = null) {
  let maxRow = sheet.getLastRow();
  // colNum is zero based, getSheetValues requires 1 base
  searchRange = searchRange || sheet.getSheetValues(1, colNum+1, maxRow, 1);
  Logger.log('searchValue: ' + searchValue);
  
  for (var i = 0; i < maxRow; ++i) {    
    // Si e valor de la celda coincide, asigna el valor a la variable.
    if (searchRange[i][0] == searchValue) {
      return { found: true, index: i, searchRange };
    }
  }
}


