var httpProxy = require('http-proxy');
var http = require('http');

var CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'HEAD, POST, GET, PUT, PATCH, DELETE',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Headers': "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
};


// Create a proxy server pointing at spreadsheets.google.com.
//var proxy = httpProxy.createProxyServer({target: 'https://spreadsheets.google.com'});
var proxy = httpProxy.createProxyServer();

http.createServer(function(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, CORS_HEADERS);
    res.end();
    return
  }
  delete req.headers.host;
  proxy.web(req, res, {
    target: 'https://spreadsheets.google.com:443',
    xfwd: false
  });
}).listen(process.env.PORT || 5000);
