"use strict";
const joi = require("joi");
const { context } = require("@arangodb/locals");
const createRouter = require("@arangodb/foxx/router");
const db = require('@arangodb').db;
const router = createRouter();
context.use(router);

const col = context.collection(`${context.configuration.collectionname}`);

const credentials = `${context.configuration.username}:${
  context.configuration.password
}`;

router.use((req, res, next) => {
  const header = req.headers.authorization;
  if (!header) res.throw(401);
  if (!header.startsWith("Basic ")) res.throw(403);
  const b64auth = header.slice("Basic ".length);
  const auth = new Buffer(b64auth, "base64").toString("utf-8");
  if (auth !== credentials) res.throw(403);
  next();
});

router
  .post("/hook", (req, res) => {
    col.save(req.body);
    res.status(204);
  });
