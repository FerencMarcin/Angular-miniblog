const app = require('./app')
const { debug } = require('console');
const http = require('http');

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " wymaga wyzszych uprawnien");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + "jest w juz uzyciu");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Nasluchuje na porcie: " + bind);
}

const port = 3000
app.set('port', port)

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

server.listen(port);