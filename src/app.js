const Express = require("express");

const app = Express();

app.set("base", "/api");

app.use("tickets", tickets);

app.listen(3000, () => {
  console.log("== APP STARTED ON PORT 3000 ==");
});
