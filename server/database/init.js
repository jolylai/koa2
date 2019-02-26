const mongoose = require("mongoose");
const db = "mongodb://localhost:/douban-trailer";
// mongose 中的 Promise 与规范的 Promise 有差异
mongoose.Promise = global.Promise;

exports.connect = () => {
  let maxConnectTimes = 0;

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    // 链接数据库
    mongoose.connect(db);

    // 尝试链接数据库失败
    mongoose.connection.on("disconnected", () => {
      maxConnectTimes++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db);
      } else {
        throw new Error("骚年出大事啦，数据库连接不了啦！！！");
      }
    });

    // 数据库链接异常
    mongoose.connection.on("error", () => {
      reject(error);
    });

    // 数据库链接成功
    mongoose.connection.once("open", () => {
      // 创建model
      const Dog = mongoose.model("Dog", { name: String });

      const doga = new Dog({ name: "阿尔法" });
      // 往数据库插入一条数据
      doga.save().then(() => {
        console.log("数据插入成功");
      });
      resolve();
    });
  });
};
