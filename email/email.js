const scheduler = require("node-schedule");
const nodemailer = require("nodemailer");
const lottery = require("../model/lotterymodel");
const ticket = require("../model/ticketmodel");

async function sendEmail(endTime, lotteryInfo) {
  var j = scheduler.scheduleJob(
    {
      year: endTime.getFullYear(),
      month: endTime.getMonth(),
      date: endTime.getDate(),
      hour: endTime.getHours(),
      minute: endTime.getMinutes(),
    },
    async function () {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "workmail.sujit@gmail.com",
          pass: "7974638557",
        },
      });
      const sold = await lottery.findOne({ _id: lotteryInfo._id });
      const winner =
        sold.ticketSold[Math.floor(Math.random() * sold.ticketSold.length)];
      const tickets = await ticket.find({ lotteryId: lotteryInfo._id });

      tickets.forEach((element) => {
        transporter.sendMail(
          {
            to: element.email,
            from: "workmail.sujit@gmail.com",
            subject: "Lottery Ticket",
            text: "You Have Buyed Lottery Ticket",
            html: `<h2>Hi! All</h2><br><h3>Winner Of The Lottery: "${lotteryInfo.name}" and Id: "${lotteryInfo._id}" is Ticket Number :"${winner}"</h3><br><br><p>Thanks and Regards</p>`,
          },
          (err, info) => {
            if (err) {
              // console.log(err);
            } else {
              // console.log("mail ", info);
            }
          }
        );
      });

      console.log("Winner Declayed");
    }
  );
}

module.exports = sendEmail;
