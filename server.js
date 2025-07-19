const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Use the port assigned by Render (or fallback to 3001 for local testing)
const PORT = process.env.PORT || 3001;

//const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit this in production: https://securelytix-api.onrender.com`);
});