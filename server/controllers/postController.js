const Post = require('../models/PostModel');
const moment = require('moment');

//
// exports.index = async (req, res) => {
//     const messages = req.flash('info');
//
//     let perPage = 12;
//     let page = req.query.page || 1;
//
//
//     try {
//         const posts = await Post.find({}).limit(22);
//         res.render('admin/posts/index', {title: 'Post Control', style: 'app', messages, posts});
//     } catch (error) {
//        console.log(error)
//     }
// }

exports.index = async (req, res) => {


    const messages = req.flash('info');
    let perPage = 9;
    let page = req.query.page || 1;

    try {
        const posts = await Post.aggregate([{$sort: {updatedAt: -1}}]).skip(perPage * page - perPage).limit(perPage).exec()
        const count = await Post.count()

        res.render('posts/index', {
            title: 'All Posts',
            style: 'main',
            moment,
            current: page,
            messages,
            pages: Math.ceil(count / perPage),
            posts,
        });
    } catch (error) {
        console.log(error)
    }
}


exports.show = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id});
        res.render('posts/show', {title: 'Post Detail', style: 'main', post, moment});
    } catch (error) {
        console.log(error)
    }
}

exports.store = async (req, res) => {
    const post = new Post({
        user_id: '1',
        title: req.body.title,
        slug: req.body.slug,
        category: req.body.category,
        excerpt: req.body.excerpt,
        body: req.body.body,
    });

    try {
        await Post.create(post);
        await req.flash('info', 'New Post has been added!');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}




exports.find = async (req, res) => {
  let search = req.body.search;
  const noSpecialChar = search.replace(/[^a-zA-Z0-9 ]/g, "");

  try {
       const posts = Post.find({
           $or: [
               { title: { $regex: new RegExp(noSpecialChar, "i") }},
               { excerpt: { $regex: new RegExp(noSpecialChar, "i") }},
               { body: { $regex: new RegExp(noSpecialChar, "i") }},
           ]
       });

       res.render('/posts/index', )

  } catch (error) {
      console.log(error);
  }


}

