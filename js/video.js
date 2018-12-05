'use strict';

// Put variables in global scope to make them available to the browser console.
const video = document.querySelector('video');
video.style.visibility = "hidden";

const canvas = window.canvas = document.querySelector('canvas');

const captureButton = document.getElementById('photo_input');
const faceOverlay = document.getElementById('face_overlay');
captureButton.onclick = function() {
	if(captureButton.selected == true){
		captureButton.selected = true;
		var sourceX = 0;
	  	var sourceY = (video.videoHeight-video.videoWidth * 4/3)/2;
	  	var sourceWidth = video.videoWidth;
	  	var sourceHeight = video.videoWidth * 4/3;
	  	var destWidth = sourceWidth;
	  	var destHeight = sourceHeight;
	 	// For Desktop - landscape camera
	 	/* 
	 	var sourceX = (video.videoWidth-video.videoHeight * 3/4)/2;
	  	var sourceY = 0;
	  	var sourceWidth = video.videoHeight*3/4;
	  	var sourceHeight = video.videoHeight;
	  	var destWidth = sourceWidth;
	  	var destHeight = sourceHeight;
	  	*/
	  	canvas.width = sourceWidth;
	  	canvas.height = sourceHeight;
	  	var canvasContext = canvas.getContext('2d');
		canvasContext.translate(canvas.width, 0);
		canvasContext.scale(-1, 1);
	  	canvasContext.drawImage(video, sourceX, sourceY, canvas.width, canvas.height, 0, 0, destWidth, destHeight );
	  	setCapturedPicture();
	  	video.style.visibility = "hidden";
	}
	else{
		video.style.visibility = "visible";
		faceOverlay.style = "display: block; height: " + (window.innerHeight - document.getElementById("header").clientHeight) + "px";
		captureButton.selected = true;
	}
};

const constraints = {
  audio: false,
  video: {width: 1280, height: 720}

};

function handleSuccess(stream) {
  console.log('handleSuccess ');
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
  video.style.width = '100%';

  video.style.top = " " +document.getElementById("header").height + "px ";
  document.getElementById("videoContainer").style.height = window.innerHeight - document.getElementById("header").clientHeight+ "px";
  console.log("innerHeight ",window.innerHeight);
  console.log("header height ",document.getElementById("header").clientHeight);
  canvas.style.top = " " +document.getElementById("header").height + "px ";
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

