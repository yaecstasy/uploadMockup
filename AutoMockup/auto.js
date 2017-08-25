
function allowDrop(ev){
    ev.preventDefault();
};

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
};

function drop(ev){
    ev.preventDefault();
    var imgid = ev.dataTransfer.getData("text");
    var divid=ev.target.id;
    var src=document.getElementById(imgid).src
    document.getElementById(imgid).src=ev.target.src;
    ev.target.src=src;
};

var fileDiv = document.getElementById("upload");
var fileInput = document.getElementById("upload-image");
console.log(fileInput);
fileInput.addEventListener("change",function(e){
  var files = this.files
  showThumbnail(files)
},false)

fileDiv.addEventListener("click",function(e){
  $(fileInput).show().focus().click().hide();
  var thumbnail = document.getElementById("thumbnail");
  while (thumbnail.firstChild) {
    thumbnail.removeChild(thumbnail.firstChild);
  }
  e.preventDefault();
},false)

fileDiv.addEventListener("dragenter",function(e){
  e.stopPropagation();
  e.preventDefault();
},false);

fileDiv.addEventListener("dragover",function(e){
  e.stopPropagation();
  e.preventDefault();
},false);

fileDiv.addEventListener("drop",function(e){
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;
  showThumbnail(files)
},false);

function showThumbnail(files){
  for(var i=0;i<files.length;i++){
    var file = files[i]
    var imageType = /image.*/
    if(!file.type.match(imageType)){
      console.log("Not an Image");
      continue;
    }
    var divholder=document.createElement("div")
    divholder.setAttribute("class","divholder")
    divholder.setAttribute("id","div"+(i+1))
    divholder.setAttribute("ondrop","drop(event)");
    divholder.setAttribute("ondragover","allowDrop(event)")
    var image = document.createElement("img");
    image.setAttribute("draggable","True");
    image.setAttribute("ondragstart","drag(event)")
    image.setAttribute("id",(i+1))
    var thumbnail = document.getElementById("thumbnail");
    image.file = file;
    thumbnail.appendChild(divholder)
    divholder.appendChild(image)

    var reader = new FileReader()
    reader.onload = (function(aImg){
      return function(e){
        aImg.src = e.target.result;
      };
    }(image))
    var ret = reader.readAsDataURL(file);
    var canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    image.onload= function(){
      ctx.drawImage(image,200,200)
    }
  }
}
