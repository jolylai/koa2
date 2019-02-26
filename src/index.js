import { readFile } from "fs";
import { resolve } from "path";

readFile(resolve(__dirname, "../package.json"), (err, data) => {
  if (!err) {
    console.log("name", JSON.parse(data).name);
  } else {
    console.log("error", err);
  }
});
