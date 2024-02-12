const EventEmitter = require ('events');
class MyEmitter extends EventEmitter{};
const myEmitter = new MyEmitter();

//Events

// This event will capture the status code and display to the console.

myEmitter.on('statusCode', (statusCode) => {
    console.log(`The HTTP Status Code is ${statusCode}.`);
});

// This event will log to the console the route that was accessed including the date and time it was accessed.

myEmitter.on('route', (route) => {
    const date = new Date();
    console.log(`The route accessed was ${route} on ${date}`);
});

// This event will log to the console when the accessed route was not the home route.

myEmitter.on('notHome', (route) => {
    if(route !== '/'){
        console.log('The route accessed was not the home route.');
    }   
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

myEmitter.on('error', (errorMessage) => {
    console.error(`Error: ${errorMessage}`);
});

module.exports = myEmitter;

