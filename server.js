const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');// modules that enables to look at hte indiviual quiries or parse out the things that we want
const figlet = require('figlet')//not a core module
//returns ascii er

const server = http.createServer(function(req, res) {// creare server method bound to http module. has annonymous funtion that fires off. variable server is a function expression
  const page = url.parse(req.url).pathname;// parsing (a built-in method)the url that is on that body and grabs the path name
  const params = querystring.parse(url.parse(req.url).query);//.... grabs the query-param student
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {// if the page laods, find the html and server it.
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {// different routes that can be triggered by humans, by requests, or by js interaction
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('student' in params){
      if(params['student']== 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "leon",
          status: "Boss Man",
          currentOccupation: "Baller"
        }
        res.end(JSON.stringify(objToJson));
      }//student = leon
      else if(params['student'] != 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));// respnd with JSON
      }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){// the script tag in the html is requesting this file
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);// passing in fucntion call that listens to the port #8000
//local host 8000 servers up at leaste three requests- html, css, and js in this case

//make snipets with a hot key to call code... practice syntax first
//or have a library of code you can refer to


//Look into specific scenario where buclers are used
