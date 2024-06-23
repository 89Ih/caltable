const express = require("express");
const Order = require("../models/Order.model");
const router = express.Router();
const { createTransport } = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const transport = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
router.get("/", (req, res) => {

  res.json({ msg: 'all good' });
});
router.post("/mailo", (req, res) => {
  const tBody = req.body;
  const hDate = new Intl.DateTimeFormat("de", { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
  const tableNumber = `Table-${tBody[0].tableNr}/${hDate}`;
  const arrOrders = tBody.map(order => `
    <tr>
      <td>${order.orderId}</td>
      <td>${order.orders.map(o => `<ul><li>${o.name} X (${o.quantity})</li></ul>`).join('')}</td>
      <td>${order.sum} €</td>
    </tr>
  `).join('');
  const TABLEHTML = `
    <table 
      border="1" 
      cellspacing="0" 
      cellpadding="5" 
      width="100%" 
      bgcolor="#1f949d" 
      style="color:#f5f5f5c8;font-weight: 700;font-size: 14px;">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Items</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${arrOrders}
      </tbody>
    </table>
  `;
  const mailOptions = {
    from: process.env.USER_SENDER,
    to: process.env.USER_RECEIVER,
    subject: tableNumber,
    html: TABLEHTML,
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send(`Error sending email: ${error.message}`);
    }
    console.log(`Email sent: ${info.response}`);
    res.status(200).send(`Email sent: ${info.response}`);
  });
});
module.exports = router;