"use strict";
const { db } = require("@arangodb");
const { context } = require("@arangodb/locals");

if (!db._collection(context.configuration.collectionname) && !context.configuration.collectionname === "") {
  db._createDocumentCollection(context.configuration.collectionname);
}
