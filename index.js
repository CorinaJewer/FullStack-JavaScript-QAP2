const http = require('http');
const myEmitter = require ('./events.js');

const { indexPage, aboutPage, subscribePage, contactPage, productsPage, weatherPage } = require ('./routes.js');


global.DEBUG = false;
const port = 3000;

const server = http.createServer((request, response) => {
    if (DEBUG)console.log('Requested URL:', request.url);
    let path = "./views/";

    switch (request.url){

        case '/':
            if (DEBUG) console.log ('Home Page');
            path += 'index.html';
            //path += 'indexed.html';
            indexPage(path,response);
            break;

        case '/about':
            if (DEBUG) console.log ('About Page');
            path += 'about.html';
            aboutPage(path,response);
            break;

        case '/subscribe':
            if (DEBUG) console.log ('Subscribe Page');
            path += 'subscribe.html';
            subscribePage(path,response);
            break;

        case '/products':
            if (DEBUG) console.log ('Products Page');
            path += 'products.html';
            productsPage(path,response);
            break;

        case '/contact':
            if (DEBUG) console.log ('Contact Page');
            path += 'contact.html';
            contactPage(path,response);
            break;

        case '/weather':
            if (DEBUG) console.log ('Weather Page');
            path += 'weather.html';
            weatherPage(path, response);
            break;
                   
        default:
            if (DEBUG) console.log ('404 not found');  
            response.writeHead(404, {'Content-Type':'text/html'});
            response.end('404 not found');
            myEmitter.emit('statusCode', [404]); 
            myEmitter.emit('error', '404 - Please check your URL.');
            break;
    };        

});

server.listen(port,() => {
    console.log(`Server is sucessfully running on port ${port}.`);
});

