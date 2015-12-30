var http = require('http');
var superagent = require('superagent')
http.createServer(function(req, res){

    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><button>f</button></form>' +
        '<script> var superagent = require("superagent"); var oBtn = document.querySelector("button");oBtn.onclick=function(){superagent("/login").send({b:"fdf"})} ' +
        '</script>' +
        '</body></html>')
    if (req.url = '/login') {
        console.log(req)
    }
}).listen(3000);