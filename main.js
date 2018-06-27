var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var html = fs.readFileSync('./index.html');
    res.write(html);
    res.end();
}).listen(9999);