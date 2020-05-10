let theme_selection = () => {
    if (typeof(Storage) !== "undefined") {
      var hayAlgoQ = window.localStorage.getItem("theme");
      //console.log(hayAlgoQ);
      if(hayAlgoQ == ""){
        fboton();
      } else if (hayAlgoQ == "light"){
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
    //start();
};

let arrepentido = () => {
    document.getElementById("section31").style.display = "block";
    document.getElementById("section32").style.display = "none";
};

// VIDEO

//navigator.mediaDevices.getUserMedia(constraints)
//.then(function(stream) {
  /* use the stream */
//})
//.catch(function(err) {
  /* handle the error */
//});

// acamica

/* let getStreamAndRecord = () => {
    nagigator.mediaDevices.getUserMedia({
        audio:false,
        video: {
            height: { max: 480 }
        }
    }).the(function(stream) {
        vide.srcObject = stream;
        video.play()
    })
} */
/* 
let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
let recorder = new RecordRTCPromisesHandler(stream, {
    type: 'video'
});
recorder.startRecording();

const sleep = m => new Promise(r => setTimeout(r, m));
await sleep(3000);

await recorder.stopRecording();
let blob = await recorder.getBlob();
invokeSaveAsDialog(blob); */

/// youtube

/* let successCallback = (stream) => {
  //1
  //document.querySelector("video").src = URL.createObjectURL(stream);
  //2
  // const mediaStream = new MediaStream();
  //const video = document.querySelector("video");
  //video.srcObject = mediaStream;
  //3
  video.srcObject = stream;
  video.play();

  
  document.querySelector("video").muted = true;

  var recorder = RecordRTC(stream, {
    type: "video"
  });
  recorder.startRecording();
  setTimeout(function(){
    recorder.stopRecording(function() {
      var blob = recorder.blob;
      var url = URL.createObjectURL(blob);
      document.querySelector("video").src = url;
      //document.querySelector("video").muted = false;
      //recorder.getDataURL(function(dataURL){
        //windows.open(dataURL)
      //}); 
    })
  }, 5 * 1000)
}

let erroCallback = (error) => {
  alert(error);
}

var mediaConstraints = {video: true, audio: false};

let start = () =>{
  navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback)
  .catch(erroCallback)
}

 *//* 

function successCallback(stream) {
	document.querySelector("video").src = URL.createObjectURL(stream);
  document.querySelector("video").muted = true;
  
	var recorder = RecordRTC (stream, {
  type: "video"
  });
  
  recorder.startRecording();
  
  setTimeout(function(){
  	recorder.stopRecording(function(){
    var blob = recorder.blob;
    var url = URL.createObjectURL(blob);
    //recorder.getDataURL(function(dataURL){
    //window.open(dataURL);
    //	})
    document.querySelector("video").qusrc = url;
    document.querySelector("video").muted = false;
    })
  }, 5 * 1000);
}

function errorCallback(error) {
	alert(error);
}

var mediaConstraints = { video: true, audio: true}

navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback) */

var videoRec = document.getElementById("cuadroVideo");

function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

function stopRecordingCallback() {
    //document.querySelector('h1').innerHTML = 'Gif recording stopped: ' + bytesToSize(recorder.getBlob().size);
    videoRec.src = URL.createObjectURL(recorder.getBlob());
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

var recorder; // globally accessible

let secondScreen = () => {
  //this.disabled = true;
  captureCamera(function(camera) {
    //document.querySelector('h1').innerHTML = 'Waiting for Gif Recorder to start...';
    recorder = RecordRTC(camera, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted: function() {
        //document.querySelector('h1').innerHTML = 'Gif recording started.';
      },
      onGifPreview: function(gifURL) {
        videoRec.src = gifURL;
      }
    });
          
    recorder.startRecording();
          
    // release camera on stopRecording
    recorder.camera = camera;
          
    document.getElementById('btn-stop-recording').disabled = false;
  });
};
      
document.getElementById('btn-stop-recording').onclick = function() {
  this.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
};
document.getElementById("campturarBtn").onclick = secondScreen()