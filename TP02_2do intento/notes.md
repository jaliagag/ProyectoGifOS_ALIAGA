```js
function getStreamAndRecord () {
   
    // empieza a correr la cámara
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { 
      height: { max: 480 }
    }
  })

//####################################

video.srcObject = stream;     
video.play();
<video id="user_video"></video>

```