const http = require('http');
const fs = require ('fs');
global.DEBUG = true;
const port = 3000;

const server = http.createServer((request, response) => {
    if (DEBUG)console.log('Requested URL:', request.url)
    let path = "./views/";

    switch (request.url){

        case '/':
            if (DEBUG) console.log ('Home Page');
            path += 'index.html';
            if (DEBUG)console.log('Path:', path);
            fetchFile(path);
            break;

        case '/about':
            if (DEBUG) console.log ('About Page');
            path += 'about.html';
            if (DEBUG) console.log('Path:', path);
            fetchFile(path);
            break;

        case '/subscribe':
            if (DEBUG) console.log ('Subscribe Page');
            path += 'subscribe.html';
            if (DEBUG) console.log('Path:', path);
            fetchFile(path);
            break;

        case '/products':
            if (DEBUG) console.log ('Products Page');
            path += 'products.html';
            if (DEBUG) console.log('Path:', path);
            fetchFile(path);
            break;

        case '/contact':
            if (DEBUG) console.log ('Contact Page');
            path += 'contact.html';
            if (DEBUG) console.log('Path:', path);
            fetchFile(path);
            break;
        
        default:
            if (DEBUG) console.log ('404 not found');
            response.writeHead(404, {'Content-Type':'text/html'});
            response.end('404 not found');
            break;
    };
    
    function fetchFile(filename){
        fs.readFile(filename, (error,content)=>{
            if (error){
            response.writeHead(500, {'Content-Type':'text/plain'});
            response.end('500 Internal Server Error');
            }else{
            response.writeHead(200, {'Content-Type':'text/html'});
            response.end(content,'utf-8');
            };
        }) ; 
    };
});

server.listen(port,() => {
    console.log(`Server is sucessfully running on port ${port}.`)
});




