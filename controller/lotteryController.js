const bcrypt = require("bcrypt");
const lotteyDao = require("../dao/lotteryDao");
const lottery = require("../model/lotterymodel");
const ticket = require("../model/ticketmodel");
const sendEmails = require("../email/email");

class LotteryController {
  static async postCreateLottery(req, res) {
    let url = req.protocol + "://" + req.get("host");
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const number = Math.floor(100000 + Math.random() * 900000);

    const lotteryInfo = {
      name: req.body.name,
      price: Number(req.body.price),
      email: req.body.email,
      _id: "LOT" + number,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    };
    let result = await lotteyDao.saveLottery(lotteryInfo);
    if (result) {
      sendEmails(lotteryInfo.endTime, lotteryInfo);
      res.status(200).json({
        message: "Lottery Created",
        lotteryId: lotteryInfo._id,
      });
    } else {
      res.status(404).json({
        message: "Error Occured",
      });
    }
  }

  static async postTickets(req, res) {
    let result = await lottery.findOne({ _id: req.body.lotteryId });
    if (!result) {
      res.status(404).json({
        message: "Lottery ID is Invalid",
      });
    }

    let currentDate = new Date();
    let ticket = {
      email: req.body.email,
      lotteryId: result._id,
      tickets: req.body.tickets,
    };
    if (
      currentDate.getTime() > result.startTime.getTime() &&
      currentDate.getTime() < result.endTime.getTime()
    ) {
      ticket.tickets.forEach((ticket1) => {
        lottery
          .findByIdAndUpdate(req.body.lotteryId, {
            $push: { ticketSold: ticket1 },
          })
          .then()
          .catch((err) => {
            console.log(err);
          });
      });
      let result = await lotteyDao.saveTicket(ticket);

      if (result) {
        res.status(200).json({
          message: "You buyed Lottery Ticket",
        });
      } else {
        res.status(404).json({
          message: "Error In Buying Lottery",
        });
      }
    } else {
      res.status(404).json({
        message: "Buying Time is Over for the Lottery",
      });
    }
  }
}

module.exports = LotteryController;
