const http=require("http");
const app=require("./app")
const port=require("./config/keys");



const server= http.createServer(app);// creating server

 //liseten server
server.listen(port, () => {
  console.log('server running on port ', { port });
});

