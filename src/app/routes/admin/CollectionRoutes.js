const express = require("express");
const router = express.Router();

const collection = require("../../controllers/admin/CollectionController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

router.get("/list", collection.list);
router.get("/list/course/:id", collection.listCourses);

// router.post("/create", hoadon.create);
// router.post("/update", hoadon.update);
// router.post("/delete", hoadon.delete);
// router.get("/detail/:id", hoadon.detail);
// router.get("/list/details/:id", hoadon.getListDetailBill);
// router.post("/detail/items/delete", hoadon.deleteDetailItem);


module.exports = router;
