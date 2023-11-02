const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    author: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Post", PostSchema);