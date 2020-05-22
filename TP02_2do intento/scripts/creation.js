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
const elGifF = document.getElementById('cuadroImg');
elGifF.style.display = "none";
var textirijillo = document.getElementById("changeling");
var cuadrito = document.getElementById("camaraFotoBtn");
var detenteInsensato = document.getElementById("btn-stop-recording");
var laDuracion = document.getElementById("laDuracion");
var recorder; // globally accessible
var dateStarted; // duration

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
          return min + ':' + sec;
        }

        return hr + ':' + min + ':' + sec;
      }

      document.getElementById('btn-start-recording').onclick = function () {
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
          type: 'gif',
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
          textirijillo.innerHTML = "Vista previa";
          elGifF.src = URL.createObjectURL(recorder.getBlob());
          imagen.style.display = "none";
          elGifF.style.display = "block";
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