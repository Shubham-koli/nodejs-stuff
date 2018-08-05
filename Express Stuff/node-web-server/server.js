import express from "express";
import hbs from "hbs";
import os from "os";

const app = express();

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) => {
  response.send("<h1>Shubham Koli</h1>");
});

//
app.get("/welcome", (request, response) => {
  let name = getName();
  response.render("welcome.hbs", {
    userName: name
  });
});

app.get("/about", (request, response) => {
  response.render("about.hbs", {
    pageInfo: "About Page",
    currentYear: new Date().getUTCFullYear()
  });
});

//get Username of User from Machine
let getName = () => {
  let user = os.userInfo();
  return user.username;
};

app.listen(3000, () => console.log("Example app listening on port 3000!"));
