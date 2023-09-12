let nombreImg = "";
let base24;

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
    // Obtiene el archivo seleccionado
    var archivo = document.getElementById("file-img");
    nombreImg = archivo.files[0].name;
    mostrarImgOriginal();
    // obtener opciones
    var opcion = getOpcion();
    if (opcion == 1) {
      cifrar();
    }
    else if (opcion == 2) {
      //descifrar();
    }   
  }

//mostrar la imagen en el canvas
function cifrar() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = nombreImg;
    img.onload = function(){
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img,0,0);
      var corrimiento = document.getElementById("corrimiento").value;
      console.log(corrimiento);
      //recorrer las coordenadas de la imagen
      for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {
          //obtener el color de cada pixel
          var pixel = ctx.getImageData(x, y, 1, 1);
          var data = pixel.data;
          var r = data[0];
          var g = data[1];
          var b = data[2];
          var a = data[3];
          //cifrar el color de cada pixel
          r = (r + parseInt(corrimiento)) % 256;
          g = (g + parseInt(corrimiento)) % 256;
          b = (b + parseInt(corrimiento)) % 256;
          //guardar el color cifrado en el pixel
          ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }

// Funciones para mostrar el contenido en pantalla
function mostrarImgOriginal() {
    var imagen = document.getElementById('img-original');
    //var url = "img/"+nombreImg;

    imagen.setAttribute("src", nombreImg );
    
  }

//Crea el boton para descargar el archivo
function crearBoton(){
    var boton = document.createElement("button");
    boton.innerHTML = "Descargar";
    boton.setAttribute("class", "btn btn-primary");
    boton.setAttribute("onclick", "descargarArchivo()");
    document.getElementById("div-c-d").appendChild(boton);
  }
