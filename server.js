const http = require('http');
const fs = require('fs');
http.createServer(function(req, res) {

    if(req.url === '/'){ //req.url has the pathname, check if it contains '.html'

        fs.readFile(__dirname + '/index.html', function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });

    }

    if(req.url.indexOf('.js') !== -1){ //req.url has the pathname, check if it contains '.js'

        fs.readFile(__dirname + '/js/main.js', function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });

    }

    if(req.url.indexOf('.css') !== -1){ //req.url has the pathname, check if it contains '.css'

        fs.readFile(__dirname + '/css/style.css', function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });

    }

    if(req.url.indexOf('.jpeg') !== -1){ //req.url has the pathname, check if it contains '.css'

        fs.readFile(__dirname + '/images/currImage.jpeg', function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.write(data);
            res.end();
        });

    }


}).listen(9999);