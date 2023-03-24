//
// (c) 2017 - Hemoeco. V1. Funciones utilizadas para trabajar con los empleados.
//
// Por el momento se tiene una copia de esto en los proyectos: Empleados, reporte-de-gastos
// Lo ideal es publicar estas opciones como API.

var SEPARADOR_SUCURSAL_EMPLEADO = " - "


function separaSucEmp(sucEmp) {
    // recibe un string con la sucursal separada del nombre del empleado por un marcador y 
    // regresa sus piezas por separado.
    var idx = sucEmp.search(SEPARADOR_SUCURSAL_EMPLEADO);
    if (idx !== -1) {
      // Si encontramos el separador, veamos si la primer parte corresponde a una sucursal válida.
      var nomSuc = sucEmp.substr(0, idx);
      return { 'suc' : nomSuc, 
                'empleado' : sucEmp.substr(idx + SEPARADOR_SUCURSAL_EMPLEADO.length, sucEmp.length) }
      }
  }
