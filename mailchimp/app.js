//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.post("/",function (req, res){
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.mail;
    const data = {

        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: first,
                    LNAME: last,
                }
            }
        ]
    }
    const jsondata= JSON.stringify(data);
    const url = "https://usX.api.mailchimp.com/3.0/lists/(apikey)";
    const options = {
        method: "POST",
        auth: "govind:(listkey)",
    }
    const request= https.request(url,options,function(response){
      response.on("data",function(data){
          console.log(JSON.parse(data));
      })
    })

    request.write(jsondata);
    request.end();

});


app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
})



















app.listen(process.env.PORT || 3000,function(){
    console.log("Server is up");
});
