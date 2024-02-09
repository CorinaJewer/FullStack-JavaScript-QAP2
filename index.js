const http = require('http');
global.DEBUG = true;
const port = 3000;

const server = http.createServer((request, response)=>{
    if (DEBUG)console.log('Requested URL:', request.url)

    switch (request.url){
        case '/':
            if (DEBUG) console.log ('Home Page');
            response.writeHead(200, 'Content-Type', 'text/html');
            response.end('<p>Home page is working.</p>');
            break;

        case '/about':
            if (DEBUG) console.log ('About Page');
            response.writeHead(200, 'Content-Type', 'text/html');
            response.end('<p>About page is working.</p>');
            break;

        case '/subscribe':
            if (DEBUG) console.log ('Subscribe Page');
            response.writeHead(200, 'Content-Type', 'text/html');
            response.end('<p>Subscribe page is working.</p>');
            break;

        case '/products':
            if (DEBUG) console.log ('Products Page');
            response.writeHead(200, 'Content-Type', 'text/html');
            response.end('<p>Products page is working.</p>');
            break;

        case '/contact':
            if (DEBUG) console.log ('Contact Page');
            response.writeHead(200, 'Content-Type', 'text/html');
            response.write('<p>Contact page is working.</p>');
            response.end();
            break;
        
        default:
            if (DEBUG) console.log ('404 not found');
            response.writeHead(404, 'Content-Type', 'text/html');
            response.end('404 not found');
            break;
    }  
})

server.listen(port,() => {
    console.log(`Server is sucessfully running on port ${port}.`)
})




