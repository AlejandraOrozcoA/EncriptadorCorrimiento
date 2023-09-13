let nombreImg = "";

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
  img.crossOrigin = "Anonymous";
  img.onload = function(){
    console.log("hola");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0);
    var corrimiento = document.getElementById("corrimiento").value;
    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    const pixeles = imageData.data;
    console.log(pixeles.length);
    var x = 0;
    for(var i = 0; i < pixeles.length; i+=4){
      r = pixeles[i];
      g = pixeles[i+1];
      b = pixeles[i+2];

      r = Math.min((r + corrimiento) % 256 , 255, 255) ;
      g = Math.min(255, (g + corrimiento) % 256, 255) ;
      b = Math.min(255, 255, (b + corrimiento) % 256) ;

      //pintarlo en el canvas
      pixeles[i] = r;
      pixeles[i+1] = g;
      pixeles[i+2] = b;
      pixeles[i+3] = 255;

      //actualizar el canvas
      ctx.putImageData(imageData, 0, 0);
    }
  }
}

// Funciones para mostrar el contenido en pantalla
function mostrarImgOriginal() {
    var imagen = document.getElementById('img-original');
    var url = "img/"+nombreImg;
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
