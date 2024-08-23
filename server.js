const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

var sec;
var pay;
// Handle the POST request
app.post('/submit', (req, res) => {
    const customerData = req.body;
    
    
    pay={
        "order_amount": customerData.amount,
        "order_currency": "INR",
        "customer_details": {
          "customer_id": customerData.customerId,
          "customer_name": customerData.customerName,
          "customer_email":  customerData.email,
          "customer_phone": customerData.phone
        },
        "order_meta": {
          "return_url": "http://localhost:3000/status?order_id=order_123"
        },
        "order_note": customerData.orderNote
      }

      //console.log(pay);
      getSessionId();
    })

function getSessionId(){
app.get("/get-session-id", (req, res) => {

  console.log(pay);
      
function session(){
      const myHeaders = new Headers();
myHeaders.append("x-api-version", "2023-08-01");
myHeaders.append("x-client-id", "13764729ed596674a0f96e06f3746731");
myHeaders.append("x-client-secret", "1f4ee1fd095fcd3cfa702f0c91389c8adca03b5a");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify(pay);


const requestOptions = {
  method: "POST",

  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://sandbox.cashfree.com/pg/orders", requestOptions)
  .then((response) => response.json())
  .then((result) =>{ 
   // sec=result.payment_session_id;
   //console.log('result'+ sec);
    res.json({payment_session_id:result.payment_session_id})
    console.log(result)
    })
    
  .catch((error) => console.error(error));
}


session();

app.get('/',(req,res)=>{

})

 } )

}

    // Sending a response back to the client
    //res.json({ message: 'Customer data received successfully!'});

     






console.log("result outside",+sec);



// app.get('/pay', (req, res) => {
//   // Redirect the user to the response URL
//   res.redirect(responseUrl);
// });









app.get('/status',(request,response)=>{
// console.log("oooooo");
// location.reload();
// console.log("after");

const order_id = request.query.order_id;

if (!order_id) {
  return res.status(400).json({ error: 'Missing required query parameters: mid and/or tid' });
}


console.log("order id:",order_id);


const myHeaders = new Headers();
myHeaders.append("x-api-version", "2023-08-01");
myHeaders.append("x-client-id", "13764729ed596674a0f96e06f3746731");
myHeaders.append("x-client-secret", "1f4ee1fd095fcd3cfa702f0c91389c8adca03b5a");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://sandbox.cashfree.com/pg/orders/order_1376472l16z9Fkj7ZMoMKDw6MpiOisUBA", requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return response.json()
  })
  .then(data => {
    console.log(data);
    response.send(JSON.stringify(data));
})
  .catch((error) => console.error(error));
//res.send(`Received mid: ${mid} Received tid: ${tid}`);
//res.send(res);


})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
