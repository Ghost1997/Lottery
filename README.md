# Lottery

1. Downolad the project
2. open project folder in terminal write "npm install"
3. in email.js file provide your gmail user and password
4. run the project by using cmd "npm start"
5  do create lotter and by lottery operation

#Sample Input for Lottery Creation

URI:localhost:3000/createLottery
Method :POST
Content-Type:application/json
Body:{
	"name":"SBI_LOTTERY",
	"price":"200",
	"startTime":"2020-06-21 12:42:02",
	"endTime":"2020-06-21 12:46:03",
	"email":"workmail.sujit@gmail.com"
}

#Sample Input for Buy Lottery ticket

URI:localhost:3000/buyTickets
Method :POST
Content-Type:application/json
Body:{
	"lotteryId":"LOT450118",
	"email":"sujitkumarverma1997@outlook.com",
	"tickets":["TIK1005","TIK1006"]
}
