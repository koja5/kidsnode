const express = require("express");
const app = express();
const http = require('http');
const api = require("./server/api");

app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

const port = process.env.PORT || "3000";
app.set("port", port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
