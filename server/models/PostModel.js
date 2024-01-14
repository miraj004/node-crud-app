const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true,
    },
    excerpt: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);

