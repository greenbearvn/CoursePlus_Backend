const express = require("express");
const router = express.Router();

const payment = require("../../controllers/frontend/PaymentController");

router.post("/savedata", payment.saveToDB);

router.post("/onlinepay", payment.transaction);

router.get("/returndata", payment.returnPayment);

router.get("/addcollections", payment.addToCollection);



module.exports = router;
