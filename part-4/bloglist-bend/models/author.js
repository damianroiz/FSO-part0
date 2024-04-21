const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: {
    type: String,
    minlength: 3,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
