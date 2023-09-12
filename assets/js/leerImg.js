let nombreImg;

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

//Cambia el titulo del h4 dependiendo de la opcion seleccionada
function cambiarTitulo(){
    var opcion = getOpcion();
    if (opcion == 1) {
      document.getElementById("titulo").innerHTML = "Cifrado";
    } else if (opcion == 2) {
      document.getElementById("titulo").innerHTML = "Descifrado";
    } else{
      document.getElementById("titulo").innerHTML = "Selecciona una opción";
    }
  }


function leerImagen() {
    //obterner img-original
    var img = document.getElementById("img-original");
    //obtener el archivo
    var file = document.getElementById("file-img");
    nombreImg = file.files[0].name;
    console.log(nombreImg);
    //leer la imagen bmp y convertirla en base64
    var reader = new FileReader();  
    reader.readAsDataURL(file.files[0]);
    reader.onload = function () {
        img.src = reader.result;
        }
    reader.onerror = function (error) {
        console.log('Error: ', error);
    }
  }

// Funciones para mostrar el contenido en pantalla
function mostrarContenidoOriginal(contenido) {
    var elemento = document.getElementById('img-original');
    elemento.src = contenido;
  }
function mostrarContenidoCifrado(contenido) {
    var elemento = document.getElementById('cifrado');
    elemento.innerHTML = contenido;
  }

//Crea el boton para descargar el archivo
function crearBoton(){
    var boton = document.createElement("button");
    boton.innerHTML = "Descargar";
    boton.setAttribute("class", "btn btn-primary");
    boton.setAttribute("onclick", "descargarArchivo()");
    document.getElementById("div-c-d").appendChild(boton);
  }
