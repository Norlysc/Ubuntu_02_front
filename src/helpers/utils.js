export function parseDate(date) {
  // Crear un objeto Date con la cadena de fecha proporcionada
  var dateObj = new Date(date);

  // Obtener día, mes y año
  var day = dateObj.getDate();
  var month = dateObj.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
  var year = dateObj.getFullYear() % 100; // Obtener los últimos dos dígitos del año

  // Asegurarse de que el día y el mes tengan dos dígitos
  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;

  // Crear la cadena de fecha en el formato dd/mm/aa
  var formatedDate = day + '/' + month + '/' + year;

  return formatedDate;
}
