const express = require("express");
const router = express.Router();

const collection = require("../../controllers/frontend/CollectionController");


router.post("/list/collections", collection.getListCollections);


module.exports = router;
