
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
            $("#takePhoto").after("<div class='picture'><img src='" + myNewImage + "'></div>") 
        }, onError);
    }
    function onError(message){
        alert("Photo Not Taken Because" + message)
    }

}




function setup() {

  }
  
function draw() {

}