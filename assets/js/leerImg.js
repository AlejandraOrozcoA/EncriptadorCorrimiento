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
      descifrar();
    }   
  }

//Cifra la imagen
function cifrar() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = "img/"+nombreImg;
  img.crossOrigin = "Anonymous";
  img.onload = function(){
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0);
    var corrimiento = document.getElementById("corrimiento").value;
    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    const pixeles = imageData.data;
    console.log(pixeles.length);
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
  crearBotonIMG();
}

//Descifra la imagen
function descifrar() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = "img/"+nombreImg;
  img.crossOrigin = "Anonymous";
  img.onload = function(){
    ctx.drawImage(img,0,0);
    var corrimiento = document.getElementById("corrimiento").value;
    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    const pixeles = imageData.data;
    console.log(pixeles.length);
    for(var i = 0; i < pixeles.length; i+=4){
      r = pixeles[i];
      g = pixeles[i+1];
      b = pixeles[i+2];

      r = Math.max((r - corrimiento) % 256 , 0, 0) ;
      g = Math.max(0, (g - corrimiento) % 256, 0) ;
      b = Math.max(0, 0, (b - corrimiento) % 256) ;

      //pintarlo en el canvas
      pixeles[i] = r;
      pixeles[i+1] = g;
      pixeles[i+2] = b;
      pixeles[i+3] = 255;

      //actualizar el canvas
      ctx.putImageData(imageData, 0, 0);
    }
  }
  crearBotonIMG();
}

// Funciones para mostrar el contenido en pantalla
function mostrarImgOriginal() {
    var imagen = document.getElementById('img-original');
    var url = "img/"+nombreImg;
    imagen.setAttribute("src", url );
    
  }

//Crea el boton para descargar el archivo
function crearBotonIMG(){
    var boton = document.createElement("button");
    boton.innerHTML = "Descargar Imagen";
    boton.setAttribute("class", "btn btn-primary");
    boton.setAttribute("onclick", "descargarImagen()");
    document.getElementById("div-c-d").appendChild(boton);
  }

  //Descarga la imagen
  function descargarImagen(){
    var canvas = document.getElementById("canvas");
    var link = document.createElement('a');
    //Obtener opcion
    var opcion = getOpcion();
    if (opcion == 1) {
      var nom = nombreImg.split(".")[0] + "_C.bmp";
      link.download = nom;
    } else if (opcion == 2) {
      var nom = nombreImg.split(".")[0] + "_C.bmp";
      link.download = nom;
    } 
    link.href = canvas.toDataURL()
    link.click();
  }