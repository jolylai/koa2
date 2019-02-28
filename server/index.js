const Koa = require("koa");
const views = require("koa-views");
const mongoose = require("mongoose");
const { resolve } = require("path");
const { connect, initSchema } = require("./database/init");

const app = new Koa();

(async () => {
  await connect();
  await initSchema();

  const User = mongoose.model("User");
  const user = await User.find({});
  console.log("user", user);
})();

app.use(
  views(resolve(__dirname, "views"), {
    extension: "pug"
  })
);

app.use(async (ctx, next) => {
  await ctx.render("index", {
    you: "yuedan",
    me: "jolylai"
  });
});

app.listen(8000);
