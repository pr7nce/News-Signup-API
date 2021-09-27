const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});
app.post("/", function(req, res) {
  const x = req.body.a;
  const y = req.body.b;
  const z = req.body.c;
  console.log(x, y, z);
  const data = {
    members: [{
      email_address: z,
      status: "subscribed",
      merge_fields: {
        FNAME: x,
        LNAME: y
      }
    }]
  }
  const jsondata = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/151d65ce18";
  const options = {
    method: "POST",
    auth: "johnm :ba26c8511671424dd5701dd93722c25e-us5",
  }
  const request = https.request(url, options, function(response) {
    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  request.end();
})
app.post("/failure", function(req, res){
  res.redirect("/");
})
app.listen(process.env.PORT||3000, function() {
  console.log("Running at 3.00k");
})
//ba26c8511671424dd5701dd93722c25e-us5
//151d65ce18 list
