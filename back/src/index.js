const server = require("./server");
const port = process.env.PORT || 8000;
server.init(port);