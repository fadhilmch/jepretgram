const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const postSchema = new Schema({
    title : String,
    imageUrl : String,
    user: {
        type:Schema.Types.ObjectId, 
        ref: 'User'
    },
    likes : [{
        type:Schema.Types.ObjectId, 
        ref: 'User'
    }]
}, {
    timestamps: true
})

let Post = mongoose.model('Post', postSchema)

module.exports = Post;