import http from "http";
import env from "dotenv";
import { routes } from "./routes.js";
import { URL } from "url";

import { bodyParser } from "./helpers/bodyParser.js";

env.config();

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(`${process.env.API_URL}${req.url}`);
  let { pathname } = parsedUrl;
  let id = null;
  console.log(`Request method: ${req.method} | Endpoint: ${pathname}`);
  const splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }
  const route = routes.find((routeObj) => {
    return routeObj.method === req.method && routeObj.endpoint === pathname;
  });

  if (route) {
    req.query = Object.fromEntries(parsedUrl.searchParams);
    req.params = { id };

    res.send = (statusCode, body) => {
      res.writeHead(statusCode, { "Content-Type": "application.json" });
      res.end(JSON.stringify(body));
    };
    if (["POST", "PUT"].includes(req.method)) {
      bodyParser(req, () => route.handler(req, res));
    } else {
      route.handler(req, res);
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`Cannot ${req.method} ${pathname}`);
  }
});

server.listen(port, () => console.log("Server started"));
