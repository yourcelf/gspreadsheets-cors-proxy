var httpProxy = require('http-proxy');
var http = require('http');

var CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'HEAD, POST, GET, PUT, PATCH, DELETE',
  'access-control-max-age': '86400',
  'access-control-allow-headers': "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization"
};


var proxy = httpProxy.createProxyServer();
// Add CORS headers to every other request also.
proxy.on('proxyRes', function(proxyRes, req, res) {
  for (var key in CORS_HEADERS) {
    proxyRes.headers[key] = CORS_HEADERS[key];
  }
});
proxy.on('error', function(err, req, res) {
  console.log(err);
  var json = { error: 'proxy_error', reason: err.message };
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }
  res.end(JSON.stringify(json));
});
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
}).listen(process.env.PORT || 5000);
