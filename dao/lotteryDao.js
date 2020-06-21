const Lottery = require("../model/lotterymodel");
const Ticket = require("../model/ticketmodel");

class lotteryDAO {
  static async saveLottery(lotteryInfo) {
    const lot = Lottery({
      _id: lotteryInfo._id,
      name: lotteryInfo.name,
      price: lotteryInfo.price,
      startTime: lotteryInfo.startTime,
      endTime: lotteryInfo.endTime,
      email: lotteryInfo.email,
    });
    let result = await lot.save().catch((err) => {
      console.log(err);
      return false;
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  static async saveTicket(ticketInfo) {
    let ticket = new Ticket({
      email: ticketInfo.email,
      lotteryId: ticketInfo.lotteryId,
      tickets: ticketInfo.tickets,
    });
    let result = await ticket.save().catch((err) => {
      console.log(err);
      return false;
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = lotteryDAO;
