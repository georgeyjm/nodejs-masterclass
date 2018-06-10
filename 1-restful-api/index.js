/*
A RESTful API for an uptime monitor

Users enter URL they want to monitor
and receives SMS (Twilio) alert when those resources go down or come back up

Included features: sign-up, sign-in, sign-out, edit settings

REQUIREMENTS:
  1. Listens on PORT, accepts incoming HTTP requests for POST, GET, PUT, DELETE and HEAD
  2. Allows a client to connect, create new user, edit or delete users
  3. Users can sign-in, which returns a token for subsequent authenticated requests
  4. Users can sign-out, invalidates token
  5. Signed-in user can use token to create a "check" (a URL up or down (custom up and down def))
  6. Signed-in user can edit or delete checks (limited 5 checks)
  7. Checks run at appropriate times (every minute), alert user if state changes

Note: In a real production program, you should use DB rather than JSON files
*/


// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// Initialize server object
let server = http.createServer((req, res) => {

    // Get and parse request
    let parsedUrl = url.parse(req.url, true);
    let reqPath = parsedUrl.pathname; // untrimmed path
    let trimmedPath = reqPath.replace(/^\/+|\/+$/g, '');
    let method = req.method.toUpperCase();
    let query = parsedUrl.query; // object with key-value pairs
    let headers = req.headers;

    // Get payload of request, if any
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', data => buffer += decoder.write(data));
    req.on('end', () => {
        buffer += decoder.end();

        // Choose the handler
        let handler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        // Construct data object
        let data = {
            'trimmedPath': trimmedPath,
            'method': method,
            'query': query,
            'headers': headers,
            'payload': buffer
        };
        // Route request to specific handler
        handler(data, (statusCode, payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
            payload = typeof(payload) === 'object' ? payload : {};
            let payloadStr = JSON.stringify(payload);

            // Response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadStr);
        });

        console.log(`${method}/ "${trimmedPath}" with payload: `, buffer);
    });
});

// Start the server on port 3000
// You can test this server by running:
//   curl localhost:3000
server.listen(3000, () => {
    console.log('Server listening on port 3000');
})

// Handlers
let handlers = {};

handlers.test = (data, callback) => {
    callback(406, {'name': 'test handler'});
};

handlers.notFound = (data, callback) => {
    callback(404);
};


// Router
let router = {
    'test': handlers.test
};
