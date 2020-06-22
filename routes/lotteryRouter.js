const express = require("express");
const router = express.Router();
const controller = require("../controller/lotteryController");

router.post("/createLottery", controller.postCreateLottery);
router.post("/buyTickets", controller.postTickets);

module.exports = router;
