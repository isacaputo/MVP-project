var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const nodemailer = require("nodemailer");
const { transporter } = require("../nodemailer/message_transporter");

// getting all the orders in the orders table
router.get("/", async function (req, res, next) {
  try {
    const result = await db(`SELECT * FROM orders;`);
    res.send(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/* INSERT into orders table */
router.post("/", async function (req, res, next) {
  // destructure data from the order
  const { clientName, clientEmail, clientPhone, clientAddress, items } =
    req.body;

  // mapping products that are in the order (mapping by id)
  try {
    const productIds = items.map((value) => value.id);

    // selecting product_half_price and product_whole_price of the products selected, so with the quantity set in the order it is possible to calculate the total price of each item in the order
    const productResponse = await db(
      `SELECT id, product_whole_price, product_half_price FROM products WHERE id IN (${productIds.join(
        ","
      )});`
    );
    // calculating the total amount for each item
    let amount = 0;
    items.forEach((item) => {
      const selected = productResponse.data.find((p) => p.id === item.id);
      if (selected) {
        if (item.size % 1 === 0) {
          amount += selected.product_whole_price * item.quantity;
        } else {
          amount += selected.product_half_price * item.quantity;
        }
      }
    });

    // inserting into orders all the data requested in the database
    await db(
      `INSERT INTO orders 
      (total_amount, client_name, client_email, client_phone, client_address) VALUES 
      (${amount}, '${clientName}', '${clientEmail}', '${clientPhone}', '${clientAddress}');`
    );

    // getting the order_id just inserted into the database so it is possible to fill in the order_has_product table, as it needs product_id and order_id for its primary key
    const ordersResponse = await db(
      "SELECT id FROM orders ORDER BY date DESC LIMIT 1;"
    );

    const orderId = ordersResponse.data[0].id;

    // inserting the items data into the order_has_product table
    const insertItemsQuery = items.map(
      (item) =>
        `INSERT INTO order_has_product (order_id, product_id, size, quantity) VALUES (${orderId}, ${item.id}, ${item.size}, ${item.quantity});`
    );

    await db(insertItemsQuery.join(""));

    // getting data from the order and sending an email to the customer
    let message = {
      from: "Fromageria Tesilli <isadora.caputo@gmail.com>",
      to: `${clientName} <${clientEmail}>`,
      subject: "Fromageria Tesilli: Recebemos o seu pedido!",
      html: `<h2><b>Olá ${clientName}!</b></h2>
      <p>Estamos muito felizes em receber o seu pedido. Para que possa acompanhar o seu andamento, o número é: <b>${orderId}</b></p>
      <p>Em breve, entraremos em contato para detalhamento do frete e entrega.</p>
      <p>Até mais!</p>`,
    };

    const info = await transporter.sendMail(message);

    res.status(200).send({ orderId: orderId });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
