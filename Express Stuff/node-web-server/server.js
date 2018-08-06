import express from "express";
import hbs from "hbs";
import os from "os";
import fs from "fs";

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getUTCFullYear();
});

//get Username of User from Machine
hbs.registerHelper("getCurrentUser", () => {
  let user = os.userInfo();
  return user.username;
});

// can log every user activity
app.use((request, response, next) => {
  let now = new Date().toString();
  let Today = currentDate();

  let log = `${now}: ${request.method} ${request.url}`;
  let name = getName();
  logUser(log, Today, name);

  console.log(log);
  next();
});

//Maintenance Mode
app.use((request, response, next) => {
  response.render("maintenance.hbs");
});

// Static Partials
app.use(express.static(__dirname + "/public"));

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

let currentDate = () => {
  let Today = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return Today.toLocaleDateString("en-US", options);
};

let logUser = (log, Date, user) => {
  fs.appendFile(
    `logs/${Date}.log`,
    log + ` request made by ${user} ` + "\n",
    err => {
      if (err) {
        console.log("some error happened" + err);
      }
    }
  );
};

app.listen(3000, () => console.log("Example app listening on port 3000!"));
