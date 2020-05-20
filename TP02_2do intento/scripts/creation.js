let theme_selection = () => {
  if (typeof (Storage) !== "undefined") {
    let hayAlgoQ = window.localStorage.getItem("theme");
    //console.log(hayAlgoQ);
    if (hayAlgoQ == "") {
      fboton();
    } else if (hayAlgoQ == "light") {
      fboton();
    } else {
      //console.log("paso")
      sboton();
    }
  } else {
    console.log("Al parecer tu navegador no quiere que guardemos información de vos, pero ¡qué persona cuidadosa!");
  }
}

// CAMBIAR DE CSS
// FALTA ACTUALIZAR EL ONCLICK DE LOS ELEMENTOS EN EL HTML

let fboton = () => {

  var elim = document.getElementById("estilardo");
  elim.remove();
  var head = document.getElementsByTagName("HEAD")[0];

  var link = document.createElement("link");

  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "styles/light_theme.css";
  link.id = "estilardo";

  head.appendChild(link);

  window.localStorage.setItem("theme", "light");
}

let sboton = () => {

  var elim = document.getElementById("estilardo");
  elim.remove();

  var head = document.getElementsByTagName("HEAD")[0];

  var link = document.createElement("link");

  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "styles/dark_theme.css";
  link.id = "estilardo";

  head.appendChild(link);

  window.localStorage.setItem("theme", "dark");
}

//////////////////////////////////////////

var iniciar = document.getElementById("letTheGamesBegin");

let holis = () => {
  document.getElementById("section31").style.display = "none";
  document.getElementById("section32").style.display = "block";
  alInicio();
};

let arrepentido = () => {
  document.getElementById("section31").style.display = "block";
  document.getElementById("section32").style.display = "none";
};
//////////////////////////////////////////
// VIDEO
//////////////////////////////////////////

const imagen = document.getElementById('cuadroVideo');
var textirijillo = document.getElementById("changeling");
var cuadrito = document.getElementById("camaraFotoBtn");
var detenteInsensato = document.getElementById("btn-stop-recording");
var recorder; // globally accessible

let alInicio = () => {
  textirijillo.innerHTML = "Un chequeo antes de empezar";
  cuadrito.src = "assets/camera.svg";
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 832,
      height: 434
    }
  })
    .then(function (stream) {
      imagen.srcObject = stream;
      imagen.play();

      document.getElementById('btn-start-recording').onclick = function () {
        // esconder el botón de inicio
        textirijillo.innerHTML = "Capturando tu Guifo";
        this.style.display = "none";
        detenteInsensato.style.display = "block";
        detenteInsensato.style.color = "white";
        detenteInsensato.style.background = "#FF6161";
        
        let hayAlgoQ = window.localStorage.getItem("theme");
        
        if(hayAlgoQ = "light"){
          cuadrito.src = "assets/recording.svg";
          cuadrito.style.background = "#FF6161";
          console.log("Aunque no lo creas, este es el del día");
        } else {
          cuadrito.src = "assets/recording_dark.svg";
          cuadrito.style.background = "#FF6161";
          console.log("Este es el de la noche");
        }



        recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 832,
          height: 434,
          obGifPreview: function (gifURL) {
            imagen.src = gifURL;
          }
        });

        recorder.startRecording();
        recorder.camera = stream;


        function stopRecordingCallback() {
          imagen.src = URL.createObjectURL(recorder.getBlob());
          recorder.camera.stop();
          recorder.destroy();
          recorder = null;
        }

        detenteInsensato.onclick = function () {
          recorder.stopRecording(stopRecordingCallback);
        }
        //document.getElementById('btn-stop-recording').disabled = false;
      };
    })
}

/* recorder.stopRecording(function () {
  recorder.camera.stop();
 */

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// CREAR EL GIF - IT WORKS



/*
DiskStorage = {
    init: function() {},
    Fetch: function({audioBlob: Blob, videoBlob: Blob, gifBlob: Blob}) {},
    Store: function({audioBlob: Blob, videoBlob: Blob, gifBlob: Blob}) {},
    onError: function() {},
    dataStoreName: function() {}
};
 */