var httpProxy = require('http-proxy');
var http = require('http');

var CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'HEAD, POST, GET, PUT, PATCH, DELETE',
  'access-control-max-age': '86400',
  'access-control-allow-headers': "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization"
};


// Create a proxy server pointing at spreadsheets.google.com.
//var proxy = httpProxy.createProxyServer({target: 'https://spreadsheets.google.com'});
var proxy = httpProxy.createProxyServer();

http.createServer(function(req, res) {
  if (req.method === 'OPTIONS') {
    // Respond to OPTIONS requests advertising we support full CORS for *
    res.writeHead(200, CORS_HEADERS);
    res.end();
    return
  }
  // Remove our original host so it doesn't mess up Google's header parsing.
  delete req.headers.host;
  proxy.web(req, res, {
    target: 'https://spreadsheets.google.com:443',
    xfwd: false
  });
  // Add CORS headers to every other request also.
  proxy.on('proxyRes', function(proxyRes, req, res) {
    for (var key in CORS_HEADERS) {
      proxyRes.headers[key] = CORS_HEADERS[key];
    }
  });
}).listen(process.env.PORT || 5000);
