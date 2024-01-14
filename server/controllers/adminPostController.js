const Post = require('../models/PostModel');
const moment = require('moment');

exports.index = async (req, res) => {
    const messages = req.flash('info');

    let perPage = 8;
    let page = req.query.page || 1;

    try {
        const posts = await Post.aggregate([{$sort: {updatedAt: -1}}]).skip(perPage * page - perPage).limit(perPage).exec()
        const count = await Post.count()
        res.render('admin/posts/index', {
            title: 'All Posts',
            style: 'app',
            moment,
            messages,
            current: page,
            pages: Math.ceil(count / perPage),
            posts
        });
    } catch (error) {
        console.log(error)
    }
}

exports.create = async (req, res) => {
    res.render('admin/posts/create', {title: 'Create Post', style: 'app'});
}

exports.edit = async (req, res) => {
    try {
        const messages = req.flash('info');
        const post = await Post.findOne({_id: req.params.id});
        console.log(post);
        res.render('admin/posts/edit', {title: 'Post Detail', style: 'app', post, messages});
    } catch (error) {
        console.log(error)
    }
}

exports.show = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id});
        res.render('admin/posts/show', {title: 'Post Detail', style: 'app', post, moment});
    } catch (error) {
        console.log(error)
    }
}

exports.store = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        slug: req.body.slug,
        category: req.body.category,
        excerpt: req.body.excerpt,
        body: req.body.body,
    });

    try {
        await Post.create(post);
        await req.flash('info', 'New Post has been added!');
        res.redirect('/admin/posts');
    } catch (error) {
        console.log(error);
    }
}


exports.update = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            user_id: '1',
            title: req.body.title,
            slug: req.body.slug,
            category: req.body.category,
            excerpt: req.body.excerpt,
            body: req.body.body,
        });
        await req.flash('info', 'The record has been updated!');
        res.redirect(`/admin/posts/${req.params.id}/edit`);
    } catch (error) {
        console.log(error);
    }
}

exports.destroy = async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        await req.flash('info', 'Record has been deleted!');
        res.redirect('/admin/posts');
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

