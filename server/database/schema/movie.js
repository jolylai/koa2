const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const MovieSchema = new Schema({
  doubanId: {
    type: String,
    unique: true
  },
  category: {
    type: ObjectId,
    ref: "Category"
  },
  rate: Number,
  title: String,
  summary: String,
  vidio: String,
  poster: String,
  cover: String,
  vidioKey: String,
  name: String,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});

mongoose.model("Movie", MovieSchema);
