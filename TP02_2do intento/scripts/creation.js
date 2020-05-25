const apikey = "dkElzr6SJfgkAbeHk3kGa70yrOiwrdcP";

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

const imagen = document.getElementById("cuadroVideo");
const elGifF = document.getElementById("cuadroImg");
const repetir = document.getElementById("repetir");
const subir = document.getElementById("subir");
const cancelar = document.getElementById("cancelar");
const elDivDeCarga = document.getElementById("elDivDeCarga");

elGifF.style.display = "none";
repetir.style.display = "none";
subir.style.display = "none";
cancelar.style.display = "none";
elDivDeCarga.style.display = "none";
cancelar.style.background = "#FFFFFF";

var textirijillo = document.getElementById("changeling");
var cuadrito = document.getElementById("camaraFotoBtn");
var detenteInsensato = document.getElementById("btn-stop-recording");
var laDuracion = document.getElementById("laDuracion");
var recorder; // globally accessible
var dateStarted; // duration
var juegaGif;

let alInicio = () => {
  document.getElementById("btn-start-recording").style.display = "block";
  cuadrito.style.display = "block";
  cuadrito.style.background = "#F7C9F3";
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
      elGifF.srcObject = stream;
      imagen.play();

      function calculateTimeDuration(secs) {
        var hr = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hr * 3600)) / 60);
        var sec = Math.floor(secs - (hr * 3600) - (min * 60));

        // Timer

        if (min < 10) {
          min = "0" + min;
        }

        if (sec < 10) {
          sec = "0" + sec;
        }

        if (hr <= 0) {
          return min + ":" + sec;
        }

        return hr + ":" + min + ":" + sec;
      }

      document.getElementById("btn-start-recording").onclick = function () {
        // esconder el botón de inicio
        textirijillo.innerHTML = "Capturando tu Guifo";
        this.style.display = "none";
        laDuracion.style.visibility = "visible";
        detenteInsensato.style.display = "block";
        detenteInsensato.style.color = "white";
        detenteInsensato.style.background = "#FF6161";

        let hayAlgoQ = window.localStorage.getItem("theme");

        if (hayAlgoQ = "light") {
          cuadrito.src = "assets/recording.svg";
          cuadrito.style.background = "#FF6161";
          console.log("Aunque no lo creas, este es el del día");
        } else {
          cuadrito.src = "assets/recording_dark.svg";
          cuadrito.style.background = "#FF6161";
          console.log("Este es el de la noche");
        }

        recorder = RecordRTC(stream, {
          type: "gif",
          frameRate: 1,
          quality: 10,
          width: 832,
          height: 434,
          timeSlice: 1000,
          obGifPreview: function (gifURL) {
            imagen.src = gifURL;
          } 
        });

        recorder.startRecording();
        dateStarted = new Date().getTime(); // duration
        recorder.camera = stream;

        (function looper() { //duration
          if (!recorder) {
            return;
          }

          laDuracion.innerHTML = "00:" + calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);

          setTimeout(looper, 1000);
        })();

        function stopRecordingCallback() {
          juegaGif = recorder.getBlob();
          textirijillo.innerHTML = "Vista previa";
          elGifF.src = URL.createObjectURL(recorder.getBlob());
          detenteInsensato.style.display = "none";
          cuadrito.style.display = "none";
          imagen.style.display = "none";
          elGifF.style.display = "block";
          repetir.style.display = "block";
          subir.style.display = "block";
          recorder.camera.stop();
          recorder.destroy();
          recorder = null;
        }

        detenteInsensato.onclick = function () {
          recorder.stopRecording(stopRecordingCallback);
        }
        //document.getElementById("btn-stop-recording").disabled = false;
      };
    })
}

repetir.onclick = function() {
  elGifF.style.display = "none";
  subir.style.display = "none";
  repetir.style.display = "none";
	imagen.style.display = "block";
	alInicio();
}

cancelar.onclick = function() {
  elGifF.style.display = "none";
  subir.style.display = "none";
  repetir.style.display = "none";
  cancelar.style.display = "none";
  elDivDeCarga.style.display = "none";
	imagen.style.display = "block";
	alInicio();
}

subir.onclick = function(){
  textirijillo.innerHTML = "Subiendo guifo";
  imagen.style.display = "none";
  elGifF.style.display = "none";
  subir.style.display = "none";
  repetir.style.display = "none";
  laDuracion.style.visibility = "hidden";
  cancelar.style.display = "block";
  elDivDeCarga.style.display = "flex";
  document.getElementById("captura").style.background = "#FFFFFF";

  //let enviamos = "https://upload.giphy.com/v1/gifs?api_key=" + apikey;

  upload = new FormData();
  upload.append("file", juegaGif, "usergif.gif");
  console.log(upload.get("file"));
  
  fetch("https://upload.giphy.com/v1/gifs?api_key=" + apikey + "&file=" + upload, {
    method: "POST",
    body: upload
    })
    .then(response => {
      return response.json;
    })
    .then(lomo => {
      //var 
      console.log(lomo);
    })
    .catch(err => {
      console.log("Error al subir el gif: " + err);
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