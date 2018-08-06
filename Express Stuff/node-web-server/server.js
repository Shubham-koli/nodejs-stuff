import express from "express";
import hbs from "hbs";
import os from "os";
import fs from "fs";

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getUTCFullYear();
});

//get Username of User from Machine
hbs.registerHelper("getCurrentUser", () => {
  let user = os.userInfo();
  return user.username;
});

app.use((request, response, next) => {
  let now = new Date().toString();
  let fileName = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  console.log(fileName.toLocaleDateString("en-US", options));
  let log = `${now}: ${request.method} ${request.url}`;
  let name = getName();
  fs.appendFile(
    `logs/${fileName.toLocaleDateString("en-US", options)}.log`,
    log + ` request made by ${name} ` + "\n",
    err => {
      if (err) {
        console.log("some error happened" + err);
      }
    }
  );
  debugger;
  console.log(log);
  next();
});

app.get("/", (request, response) => {
  response.send("<h1>Shubham Koli</h1>");
});

//
app.get("/welcome", (request, response) => {
  response.render("welcome.hbs");
});

app.get("/about", (request, response) => {
  response.render("about.hbs");
});

let getName = () => {
  let user = os.userInfo();
  return user.username;
};

app.listen(3000, () => console.log("Example app listening on port 3000!"));
