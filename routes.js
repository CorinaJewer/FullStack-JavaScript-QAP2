const fs = require('fs');
const pathModule = require('path');
const myEmitter = require ('./events.js');
var weather = require('weather-js');


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

async function weatherPage(path, response) {
    try {
        const filePath = pathModule.join(__dirname, 'views', 'weather.html');
        const htmlContent = await fs.promises.readFile(filePath, 'utf-8');

        const result = await new Promise((resolve, reject) => {
            weather.find({ search: 'Corner Brook, CA', degreeType: 'C' }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    
        if (DEBUG)console.log(JSON.stringify(result, null, 2));

        const temperature = result[0].current.temperature;
        const description = result[0].current.skytext;
        const feelsLike = result[0].current.feelslike;
        const windDisplay = result[0].current.winddisplay;
        const date = result[0].current.date;
        const observationTime = result[0].current.observationtime;
        const image = result[0].current.imageUrl;
 
        const modifiedHtml = htmlContent
            .replace('<span id="temperature"></span>', temperature)
            .replace('<span id="description"></span>', description)
            .replace('<span id="feels_like"></span>', feelsLike)
            .replace('<span id="wind_display"></span>', windDisplay)
            .replace('<span id="date"></span>', date)
            .replace('<span id="observation_time"></span>', observationTime)
            .replace('<img id="weather_image" src="" alt="Current Weather Image">', '<img id="weather_image" src="' + image + '" alt="Current Weather Image">');

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(modifiedHtml);
        myEmitter.emit('route', [path]);
        myEmitter.emit('notHome', [path]);
        myEmitter.emit('statusCode', [200]);
        myEmitter.emit('fileFound',[path]);

    } catch (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Error fetching weather data.');
        myEmitter('status code', [500])
        myEmitter.emit('noSuchFile', [path]); 
        myEmitter('error', 'Error fetching weather data.')        
    };
};
    

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
    }); 
};

module.exports = { indexPage, aboutPage, subscribePage, productsPage, contactPage, weatherPage };

