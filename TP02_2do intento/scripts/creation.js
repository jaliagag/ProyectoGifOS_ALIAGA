let theme_selection = () => {
  if (typeof (Storage) !== "undefined") {
    var hayAlgoQ = window.localStorage.getItem("theme");
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
//Failed to execute createobjecturl on url no function was found that matched the signature provided
//////////////////////////////////////////


//youtube

/* function successCallback(stream) {
  //document.getElementById('cuadroVideo').src = URL.MediaStream(stream);
  //document.getElementById('cuadroVideo').muted = true;

  var recorder = RecordRTC(stream, {
    type: "video"
  });
  recorder.startRecording();
  function aGrabar() {
    recorder.stopRecording(function () {
      var blob = recorder.blob;
      var mediaStream = new MediaStream(blob);
      document.getElementById('cuadroVideo').srcObject = mediaStream;
      document.getElementById('cuadroVideo').muted = false;
      /* recorder.getDataURL(function(dataURL) {
        window.open(dataURL);
      }) *//*
    });
  };
  aGrabar();
}

function errorCallback(error) {
  alert("ASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASDF" + error);
}

var mediaConstraints = { video: true, audio: false };

function alInicio() {
  navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}
*/
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// Mati

const image = document.getElementById('cuadroVideo');
var recorder; // globally accessible

let alInicio = () => {
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 832,
			height: 434 
    }
  })
  .then(function(stream) {
    image.srcObject = stream;
    image.play();
    
    document.getElementById('btn-start-recording').onclick = function (stream) {
      // esconder el botón de inicio
        recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 832,
          height: 434,
          //hidden: 240,
          /* onGifRecordingStarted: function () {
          },
          onGifPreview: function (gifURL) {
            image.src = gifURL;
          } */
        });
        recorder.startRecording();
        // release camera on stopRecording
        recorder.camera = camera;
    
        //document.getElementById('btn-stop-recording').disabled = false;
    };
    
  })
}

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