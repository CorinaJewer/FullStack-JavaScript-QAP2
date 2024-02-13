const EventEmitter = require ('events');
class MyEmitter extends EventEmitter{};
const myEmitter = new MyEmitter();
const fs = require('fs');
const path = require ('path');
const fsPromises = require('fs').promises;

const { format, getYear } = require('date-fns');
const { v4:uuid } = require ('uuid');


//Events

// This event will capture the status code and display to the console.

myEmitter.on('statusCode', (statusCode) => {
    console.log(`The HTTP Status Code is ${statusCode}.`);
});

// This event will log to the console the route that was accessed including the date and time it was accessed.
// Event updated for Bonus tasks to enhance event logging to write files to disk.

myEmitter.on('route', (route) => {
    const date = new Date();
    console.log(`The route accessed was ${route} on ${date}`);
    if (!fs.existsSync(path.join(__dirname, 'logs'))){
        fs.mkdirSync(path.join(__dirname,'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', 'route.log'),`Route Event: ${route} on ${date}\n`, (error) =>{
        if (error) throw error;
    });
});

// This event will log to the console when the accessed route was not the home route.

myEmitter.on('notHome', (route) => {
    if(route !== '/'){
        console.log('The route accessed was not the home route.');
    };   
});

// This event will log to the console an error message when no such filename has been located.

myEmitter.on('noSuchFile', (filename) =>{
    console.log(`Unable to locate a file ${filename}`)
});

// This event will log to the console a message indicating the file that has been located.

myEmitter.on('fileFound', (filename) =>{
    console.log(`Located the file ${filename}`)
});

// This event will log an specified error message to the console.
// Event updated to enhance errror logging by writing file to disk.

myEmitter.on('error', (errorMessage) => {
    const date = new Date();
    console.error(`Error: ${errorMessage} occured on ${date}`);
    if (!fs.existsSync(path.join(__dirname, 'logs'))){
        fs.mkdirSync(path.join(__dirname,'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', 'error.log'),`Error Event ${errorMessage} on ${date}\n`, (error) =>{
        if (error) throw error;
    });
});

// Enhanced event logging - This event logs a daily file to the year folder and encapsulates different levels of events including debug, error, info, warning.

myEmitter.on('logEvent', async (event, level, message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${event}\t${level}\t${message}\t${uuid()}`;
    try {
        const yearFolder = 'logs/' + getYear(new Date());
        if(!fs.existsSync(path.join(__dirname, 'logs/'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs/'));
            if(!fs.existsSync(path.join(__dirname, yearFolder))) {
                await fsPromises.mkdir(path.join(__dirname, yearFolder));
            }
        }
        else {
            if(!fs.existsSync(path.join(__dirname, yearFolder))) {
                await fsPromises.mkdir(path.join(__dirname, yearFolder));
            }
        }
        // Daily file
        if(DEBUG) console.log(logItem);
        const fileName = `${format(new Date(), 'yyyyMMdd')}` + '_http_events.log';
        await fsPromises.appendFile(path.join(__dirname, yearFolder, fileName), logItem + '\n');
    } catch (err) {
        console.log(err);
    };
}); 

module.exports = myEmitter;

