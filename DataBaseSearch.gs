/* Se establece conexión con la base de datos (IT_Rentas), crea un objeto contenedor 
con todos los elementos de los campos indicados, de 'CataEmpleados' y 'CataSucursales'. */

// Se establecen las instancias para la busqueda en la BD.
function obtenerDatos(correo) {
  //let correo = 'antonio.vargas@hemoeco.com';
  //let correo = 'juanito@prueba.com';
  let infoEmpleado = {
    idSucNom: undefined,
    apellidos: undefined,
    nombre: undefined,
    jefe: undefined
  };
  
  let query = `select SUCURSALNOMINA, APELLIDOS, NOMBRE, JEFEINMEDIATO
     FROM CataEmpleados
     Where ACTIVO = 1 and CORREOELECTRONICO = '${correo}'`;
  let rs = ejecutaQuery(query);
  
  // Al regresar nada, va a buscar en las hojas de calculo.
  if(!rs.next()){
    Logger.log("No se encontró el valor en la base de datos.");
    return;  // Al no regresar nada, va a buscar en las hojas de calculo.
  }

  //while (rs.next()) {         // Antes servía con el while, luego dejó de hacerlo.
      infoEmpleado.idSucNom = rs.getInt('SUCURSALNOMINA');
      infoEmpleado.apellidos = rs.getString('APELLIDOS');
      infoEmpleado.nombre = rs.getString('NOMBRE');
      infoEmpleado.jefe = rs.getInt('JEFEINMEDIATO');
  //}

  query = `select CORREOELECTRONICO from CataEmpleados where IDEMPLEADO = ${infoEmpleado.jefe}`;
  rs = ejecutaQuery(query);
  while(rs.next()){
    infoEmpleado.jefe = rs.getString('CORREOELECTRONICO');
  }
  infoEmpleado.idSucNom = asignarSuc(infoEmpleado);

  infoEmpleado.nombre = infoEmpleado.idSucNom + infoEmpleado.apellidos + ' ' + infoEmpleado.nombre;
  infoEmpleado.nombre = quitarAcentos(infoEmpleado.nombre);

  Logger.log("Nombre: " + infoEmpleado.nombre + " || Correo jefe: " + infoEmpleado.jefe);
  return infoEmpleado;
}

function ejecutaQuery(query) {
    Logger.log('Query: ' + query);
    let db = conectarDB();
    if(db) {
      let st = db.createStatement();
      if (st.execute(query)) {
        return st.getResultSet();
      }
    }
}

function conectarDB() {
  let db = Jdbc.getConnection('jdbc:sqlserver://gw.hemoeco.com:5300;databaseName=IT_Rentas', 'reportes', 'R3p0rt3s'); // Conexión final.
  return db;
 // Hay que llamar close cuando termine de utilizar la conexion.
}

function asignarSuc(infoEmpleado) {
  switch(infoEmpleado.idSucNom) {
    case 1: infoEmpleado.idSucNom = 'Corporativo - ';
      break;
    case 2: infoEmpleado.idSucNom = 'Villahermosa - ';
      break;
    case 3: infoEmpleado.idSucNom = 'Cancún - ';
      break;
    case 4: infoEmpleado.idSucNom = 'Tijuana - ';
      break;
    case 5: infoEmpleado.idSucNom = 'Guadalajara - ';
      break;
    case 6: infoEmpleado.idSucNom = 'Mexicali - ';
      break;
    case 7: infoEmpleado.idSucNom = 'Puebla - ';
      break
    case 8: infoEmpleado.idSucNom = 'México - ';
      break
    default:
      return;
  }
  return infoEmpleado.idSucNom;
}

var quitarAcentos = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 
