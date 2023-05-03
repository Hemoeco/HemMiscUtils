//
// (2023) Hemoeco Renta
// Misc Utils - Use it as library on your projects
//
////////////////////////////////////////////////////

function findColNum(sheet, colName, titles = null, rowTitle = 1) {
  // Search column name, then return it's corresponding col number (one based)

  let cols = sheet.getLastColumn(); 

  // get titles only if not already loaded
  titles = titles || sheet.getSheetValues(rowTitle, 1, 1, cols); // Get all titles

  // console.log(titles);
  
  let indiceFila; // En el ciclo for, se hace la sumatoria que dará el índice buscado.
  Logger.log('colName: ' + colName);
  
  for (let i = 0; i < cols; ++i) {
    // Logger.log(titles[0][i]);
    if (titles[0][i] == colName) {
      return { found: true, col: i+1, titles };
    }
  }
}

/***
 * returns row number if found (one based). undefined if not found
 *  */
function findRowForValueInCol(sheet, searchValue, colNum, searchRange = null) {
  let maxRow = sheet.getLastRow();
  searchRange = searchRange || sheet.getSheetValues(1, colNum, maxRow, 1);
  Logger.log('searchValue: ' + searchValue);
  
  for (var i = 0; i < maxRow; ++i) {    
    // Si e valor de la celda coincide, asigna el valor a la variable.
    if (searchRange[i][0] == searchValue) {
        return { found: true, row: i+1, searchRange };
    }
  }
}

// Obtiene el año en que se ejecuta el código, para llegar a los datos del año en curso.
function validateYear(sheet, numRow, yearColNum) {
    let anioActual = year();
    let anio = sheet.getRange(numRow, yearColNum).getValue();

    if(anio != anioActual) {
      Logger.log("Año no actual: " + anio);
      return false;
    }
    
    Logger.log('Año: ' + anio);
    Logger.log('El elemento está en la fila: ' + numRow);
    // ** Si encuentra el dato, termina aquí y regresa, sino, retorna mensaje de error **.
    return true;
}

function year(){
  let year = new Date().getFullYear();
  return year;
}

function findRowForValueInColCurYear(sheet, searchValue, colNum, yearColNum, searchRange = null) {
  let maxRow = sheet.getLastRow();
  searchRange = searchRange || sheet.getSheetValues(1, colNum, maxRow, 1);
  Logger.log('searchValue: ' + searchValue);
  
  for (var i = 0; i < maxRow; ++i) {    
    // Si e valor de la celda coincide, asigna el valor a la variable.
    if (searchRange[i][0] == searchValue) {
      // Si no coincide con el año, sigue la búsqueda.
      if(validateYear(sheet, i+1, yearColNum)){
        return { found: true, row: i+1, searchRange };
      }
    }
  }
}