const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const ejs=require("ejs");


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


    app.get("/", async (req, res) => {
       
        res.render("index.ejs");
      });


      app.post("/", async (req, res) => {
        try {
          console.log(req.body);
          
          const categories = req.body.categories;
          const formattedCategory = categories.charAt(0).toUpperCase() + categories.slice(1).toLowerCase();
          const response = await axios.get(
            `https://v2.jokeapi.dev/joke/${formattedCategory}`
          );
          const result = response.data;
          console.log(result);
          res.render("index.ejs", {
            data: result,
          });
        } catch (error) {
          console.error("Failed to make request:", error.message);
          res.render("index.ejs", {
            error: "No activities that match your criteria.",
          });
        }
      });



   



app.listen(9056,function(){

    console.log("listening on port 9056");
})