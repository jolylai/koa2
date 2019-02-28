const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  movies: [
    {
      type: ObjectId
    }
  ],
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

mongoose.model("Category", CategorySchema);
