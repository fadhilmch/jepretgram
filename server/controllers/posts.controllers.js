const Post = require('../models/posts.model');

module.exports = {
  findAll: (req, res) => {
    Post.find()
        .populate('user')
        .populate('upvote')
        .populate('downvote')
        .exec()
        .then(data => {
            return res.status(200).json({
                message: "get all answer data",
                data
            })
        })
        .catch(err => {
            return res.status(400).json({
                message: 'failed to get all answers data',
                err
            })
        })
  },

  create: (req, res) => {
    Post.create({
            title: req.body.title,
            imageUrl: req.file.cloudStoragePublicUrl,
            user: req.body.userId,
            upvote: [],
            downvote: []
        }, (err, newpost) => {
            if (err) {
                return res.status(400).json({
                    message: `create post erorr ${err}`,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: `post success`,
                    data: newpost
                })
            }
        })
  },

  findById: (req, res) => {
      Post.findOne({
              _id: req.params.id
              // userId : req.params.user_id
          })
          .populate('user')
          .populate('upvote')
          .populate('downvote')
          .exec()
          .then(data => {
              return res.status(200).json({
                  message: "Succeed get answer data by id",
                  data
              })
          })
          .catch(err => {
              return res.status(400).json({
                  message: "Failed to get answer data by Id"
              })
          })
  },

  update: (req, res) => {
    console.log(req.params.id);
    Post.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true
            }
        )
        .then((data) => {
            console.log(data)
            return res.status(200).json({
                message: "Succeed to update answer data",
                data
            })
        })
        .catch(err => {
            return res.status(400).json({
                message: "failed to update data"
            })
        })
    },

    destroy: (req, res) => {
        Post.findByIdAndRemove(
                req.params.id
            )
            .then(() => {
                return res.status(200).json({
                    message: "Succeed to delete data"
                })
            })
            .catch(() => {
                return res.status(400).json({
                    message: "Failed to delete data"
                })
            })
    },


    // uploadFile: (req, res) => {
    //     Post
    //         .create({
    //             title: req.body.title,
    //             image: req.file.cloudStoragePublicUrl,
    //             user_id: req.body.user_id,
    //             upvote: req.body.userupvote_id,
    //             downvote: req.body.userdownvote_id,
    //             category: req.body.category
    //         }, (err, newpost) => {
    //             if (err) {
    //                 return res.status(400).json({
    //                     message: `create post erorr ${err}`,
    //                     data: {}
    //                 })
    //             } else {
    //                 res.status(200).json({
    //                     message: `post success`,
    //                     data: newpost
    //                 })
    //             }
    //         })
    // },

    // findByIdUserPost: (req, res) => {
    //     let userid = req.params.user_id
    //     Post
    //         .find({ user_id: userid })
    //         .then(post => {
    //             res.status(200).json({
    //                 message: `success show post`,
    //                 data: post
    //             })
    //         }).catch(err => {
    //             res.status(400).json({
    //                 message: `error find post`
    //             })
    //         })
    // },

    // searchTitle: (req, res) => {
    //     let search = req.body.keyword
    //     Post
    //         .find({ title: { $regex: `.*${search}.*`, $options: `i` } })
    //         .then(post => {
    //             res.status(200).json({
    //                 message: `success search post with title ${search}`,
    //                 data: post
    //             })
    //         }).catch(err => {
    //             message: `error search post `
    //         })
    // }
}