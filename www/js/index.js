
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI
    }

    $("#takePhoto").on("click", takePic);

    function takePic() {
        navigator.camera.getPicture(onSuccess, onError, options)
    }

    function onSuccess(imageData) {
        console.log(imageData);
        resolveLocalFileSystemURL(imageData, function (fileEntry) {
            var myNewImage = fileEntry.toURL()
            console.log(myNewImage);
            // do something with URL, assign to src or create an html
            // $("#takePhoto").after("<div class='picture'><img src='" + myNewImage + "'></div>") 
            preload(myNewImage);
            imageSetup();
        }, onError);
    }
    function onError(message){
        alert("Photo Not Taken Because" + message)
    }

}


//code from: https://youtu.be/KfLqRuFjK5g / https://openprocessing.org/sketch/952881 / https://editor.p5js.org/Andrew_Sink/sketches/YM-Ply_cD

var img; // creates image variable

var size = 7 // element size

var startx = 0 // starting x coordinate
var starty = 0 // starting y coordinate

function preload(x) {
  img = loadImage('img/image0.png'); // preloads picture! 
  // img = loadImage(x);
  
}

function imageSetup(){
  img.resize(windowWidth, 0); // resizes image to window size
  img.loadPixels(); // loads image
  img.updatePixels(); // updates image
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("p5canvas"); // creates canvas
    imageSetup();
}


function draw() {
  clear();
  background(0);
  frameRate(24);

  var size = floor(map(mouseX, 0, width, 7, 40)); // maps mouseX value to element size

  for (var starty = 0; starty < img.height; starty++) { // creates pixel index
    for (var startx = 0; startx < img.width; startx++) {
      var index = (startx + starty * img.width) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      var bright = ((0.3 * r) + (0.59 * g) + (0.11 * b)) // sets pixel value to adjusted grayscale

      noStroke(); // disables element stroke

    fill(r,g,b)
      // if (bright < 63.75) {
      //   fill(0);
      // } else if (bright >= 63.75 && bright < 127.5) {
      //   fill(85);
      // } else if (bright >= 127.5 && bright <= 191.25) {
      //   fill(170);
      // } else if (bright >= 191.25 && bright <= 255) {
      //   fill(255);
      // }


      // fill(bright) // fills element with adjusted grayscale

      rect(startx, starty, size, size)
      
      // triangle(startx, starty, startx + (size / 2), starty + size, startx + size, starty) // upside down triangle
      // triangle(startx, starty, startx, starty + size, startx + size, starty)

      startx = startx + size -1 // set new startx value
    }
    starty = starty + size -1 // set new starty value
  }
}