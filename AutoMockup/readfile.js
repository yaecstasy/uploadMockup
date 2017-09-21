$(document).ready(function(){
// function onError(e){
// 	var msg = '';
//
// 	switch (e.code) {
// 	case FileError.QUOTA_EXCEEDED_ERR:
// 	    msg = 'QUOTA_EXCEEDED_ERR';
// 		break;
// 	case FileError.NOT_FOUND_ERR:
// 		msg = 'NOT_FOUND_ERR';
// 		break;
// 	case FileError.SECURITY_ERR:
// 		msg = 'SECURITY_ERR';
// 	    break;
// 	case FileError.INVALID_MODIFICATION_ERR:
// 		msg = 'INVALID_MODIFICATION_ERR';
// 		break;
// 	case FileError.INVALID_STATE_ERR:
// 		msg = 'INVALID_STATE_ERR';
// 	    break;
// 	default:
// 		msg = 'Unknown Error';
// 		break;
//     };
//
// 	console.log('Error: ' + msg);
// };

function renameFile(cwd,src,newName){
	cwd.getFile(src,{},function(fileEntry){
	    fileEntry.moveTo(cwd, newName);
	},onError);
};

function toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
};

function listResults(entries) {

  var fragment = document.createDocumentFragment();

  entries.forEach(function(entry, i) {
    var li = document.createElement('li');
    li.innerHTML = ['<span>', entry.name, '</span>'].join('');
    fragment.appendChild(li);
  });
  $("#filelist").empty();
  document.querySelector('#filelist').appendChild(fragment);
};

function onInit(fs) {

	//create one test file
    var options = {};
    if(!localStorage.isInit){
        options={create:false};
    }else{
        options={create:true,exclusive:false};
    }

	fs.root.getFile("test3.txt",options,function(fileEntry){
        localStorage.isInit=true;
		var dirReader = fs.root.createReader();
		var entries = [];

		// Call the reader.readEntries() until no more results are returned.
		var readEntries = function() {
			dirReader.readEntries (function(results) {
				if (!results.length) {
					listResults(entries.sort());
				} else {
					entries = entries.concat(toArray(results));
					readEntries();
				}
			}, onError);
		};

		readEntries(); // Start reading dirs.
	},onError);
};

window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, onInit, onError);

$(function(){
	$("#change-name-btn").click(function(){
		window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, function(fs){
		renameFile(fs.root,$("#target-name").val(),$("#new-name").val()+".txt");
			onInit(fs);
		}, onError);
	});
});
});
