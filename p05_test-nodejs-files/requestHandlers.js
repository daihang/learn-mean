var fs = require("fs");
var formidable = require("formidable");
var url  = require('url');
var homeworkDir='./homework/';

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post" enctype="multipart/form-data" name="form1" id="form1">'+
    '<p>'+
	'学号：'+
	'<input type="text" name="number" id="textfield" />'+
	'</p>'+
    '<p>'+
	'姓名：'+
    '<input type="text" name="name" id="textfield2" />'+
    '</p>'+
    '<p>'+
    '<input type="file" name="upload" id="fileField" />'+
    '</p>'+
    '<p>'+
    '<input type="submit" name="button" id="button" value="提交" />'+
    '</p>'+
    '</form>'+
	'</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  form.uploadDir = homeworkDir;
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
	console.log(fields);
	var number = fields.number;
	var name = fields.name;
	fs.renameSync(files.upload.path, homeworkDir+number+"_"+name+".zip");//文件重命名
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("You can download your homework:<br/>");
	//var t= "<a href='/download'>aaa.zip</>"
    response.write("<a href='/download?file="+number+"_"+name+".zip'>"+number+"_"+name+".zip</>");
    response.end();
  });
}



function download(response, request) {
  console.log("Request handler 'download' was called.");
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  console.log(query);
  var toDownloadFile= query.file;  
  fs.readFile(homeworkDir+toDownloadFile, "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      //response.writeHead(200, {"Content-Type": "image/png"});
	  response.setHeader('Content-disposition', 'attachment; filename=' + toDownloadFile);
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.download = download;