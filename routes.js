const fs = require ('fs');
const myEmitter = require ('./events.js');

function indexPage(path, response){
    fetchFile(path,response);
    myEmitter.emit('route', path);
}

function aboutPage(path, response){
    fetchFile(path,response);
    myEmitter.emit('route', path);
    myEmitter.emit('notHome', path);
}

function subscribePage(path, response){
    fetchFile(path,response);
    myEmitter.emit('route', path);
    myEmitter.emit('notHome', path);
}

function productsPage(path, response){
    fetchFile(path,response);
    myEmitter.emit('route', path);
    myEmitter.emit('notHome', path);
}

function contactPage(path, response){
    fetchFile(path,response);
    myEmitter.emit('route', path);
    myEmitter.emit('notHome', path);
}




function fetchFile(filename, response){
    fs.readFile(filename, (error,content)=>{
        if (DEBUG) console.log("Inside fetchFile");
        if (error){
            response.writeHead(500, {'Content-Type':'text/plain'});
            response.end('500 Internal Server Error') 
            myEmitter.emit('statusCode', [500]); 
            myEmitter.emit('noSuchFile', [filename]); 
            myEmitter.emit('error', '500 Internal serve error.')             
        }else{
            response.writeHead(200, {'Content-Type':'text/html'});
            response.end(content,'utf-8');
            myEmitter.emit('statusCode', [200]);
            myEmitter.emit('fileFound',[filename] );
           
           
        };
    }) 
};

module.exports = { indexPage, aboutPage, subscribePage, productsPage,contactPage };