// server.mjs
const express = require("express");
const app = express(); /*create instance of the express pipeline, everytime a message comes in to the port, the operating system gives the message to express and express goes to find out which function it should run*/
const userController = require("./controllers/users");

const PORT = 3000;

//Middleware
app.use(express.json())
app.use(express.static(__dirname +"/dist"))//Static, is a middleware that takes a look at every request, way to make an actual web server




//Controllers

app.get("/", (req, res) => {
  res.send("Hello World");
}).use("/users", userController);

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
})

// const server = createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello New Paltz\n');
// });

// // starts a simple http server locally on port 3000
// server.listen(PORT, '127.0.0.1', () => {
//     console.log('Listening on 127.0.0.1:3000');
// });

// run with `node server.mjs`