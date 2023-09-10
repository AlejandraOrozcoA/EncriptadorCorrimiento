let nombreArchivo;

//Obtiene el valor del select "opciones" para saber si se va a cifrar o descifrar
function getOpcion(){
  var opcion = document.getElementById("opciones").value;
  if (opcion == 1) {
    return 1; //Cifrar
  } else if (opcion == 2) {
    return 2; //Descifrar
  } else{
    return 0;
  }
}

//Abre el archivo de txt y obtiene el contenido
function leerArchivo() {
  let doc = document.getElementById('file-song')
  let archivo = doc.files[0];
  nombreArchivo = archivo.name;
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenidoOriginal(contenido);
    if (getOpcion() == 1) { //Cifrado
      cifrado(contenido);
    } else if (getOpcion() == 2) { //Descifrado
      descifrado(contenido);
    }
  };
  lector.readAsText(archivo);
}

//Cifra el texto del archivo haciendo el corrimiento
function cifrado(contenido){
  //quita espacio en blanco, tabulaciones, saltos de linea y caracteres especiales
  var texto = contenido.replace(/\s+/g, '');
  texto = texto.replace(/[^a-zA-Z ]/g, "");
  //convierte a mayusculas usando el codigo ascii
  for (let i = 0; i < texto.length; i++) {
    if (texto[i].charCodeAt(0) >= 97 && texto[i].charCodeAt(0) <= 122) {
      texto = texto.replace(texto[i], String.fromCharCode(texto[i].charCodeAt(0) - 32));
    }
  }
  //Hace el corrimiento (cifrado)
  var corrimiento = parseInt(document.getElementById('corrimiento').value);
  var textoCifrado = "";
  for (let i = 0; i < texto.length; i++) {
    if (texto[i].charCodeAt(0) >= 65 && texto[i].charCodeAt(0) <= 87) {
      textoCifrado += String.fromCharCode((texto[i].charCodeAt(0) - 65 + corrimiento) % 26 + 65);
    }else if (texto[i].charCodeAt(0) >= 88 && texto[i].charCodeAt(0) <= 90) {
      textoCifrado += String.fromCharCode((texto[i].charCodeAt(0) - 65 + corrimiento - 26) % 26 + 65);
    }
  }
  mostrarContenidoCifrado(textoCifrado);
}

//Descifra el texto del archivo haciendo el corrimiento inverso
function descifrado(contenido){
  //quita espacio en blanco, tabulaciones, saltos de linea y caracteres especiales
  var texto = contenido.replace(/\s+/g, '');
  texto = texto.replace(/[^a-zA-Z ]/g, "");
  //convierte a mayusculas usando el codigo ascii
  for (let i = 0; i < texto.length; i++) {
    if (texto[i].charCodeAt(0) >= 97 && texto[i].charCodeAt(0) <= 122) {
      texto = texto.replace(texto[i], String.fromCharCode(texto[i].charCodeAt(0) - 32));
    }
  }
  //Hace el corrimiento (descifrado)
  var corrimiento = parseInt(document.getElementById('corrimiento').value);
  var textoDescifrado = "";
  for (let i = 0; i < texto.length; i++) {
    if (texto[i].charCodeAt(0) >= 68 && texto[i].charCodeAt(0) <= 90) {
      textoDescifrado += String.fromCharCode((texto[i].charCodeAt(0) - 65 - corrimiento) % 26 + 65);
    }else if (texto[i].charCodeAt(0) >= 65 && texto[i].charCodeAt(0) <= 67) {
      textoDescifrado += String.fromCharCode((texto[i].charCodeAt(0) - 65 - corrimiento + 26) % 26 + 65);
    }
  }
  mostrarContenidoCifrado(textoDescifrado);
}

// Funciones para mostrar el contenido en pantalla
function mostrarContenidoOriginal(contenido) {
  var elemento = document.getElementById('original');
  elemento.innerHTML = contenido;
}
function mostrarContenidoCifrado(contenido) {
  var elemento = document.getElementById('cifrado');
  elemento.innerHTML = contenido;
}

//Crear archivo de texto y descargarlo
function descargarArchivo() {
  var contenido = document.getElementById('cifrado')
  //crea un archivo de texto con el contenido cifrado
  var archivo = new Blob([contenido.innerHTML], {type: 'text/plain'});
  //descarga el archivo
  var a = document.createElement("a");
  var url = URL.createObjectURL(archivo);
  a.href = url;
  if (getOpcion() == 1) { //Cifrado
    var nom = nombreArchivo.split(".")[0] + "_C.txt";
    a.download = nom;
  } else if (getOpcion() == 2) { //Descifrado
    var nom = nombreArchivo.split(".")[0] + "_D.txt";
    a.download = nom;
  }
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);  
  }, 0);
}

