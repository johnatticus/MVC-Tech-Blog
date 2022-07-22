const router = require("express").Router();
const { response } = require("express");
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { 
                user_id: req.session.user_id,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('all-posts-admin', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

// for new post form
router.get("/new", withAuth, (req, res) => {
    res.render('newpost', {
        layout: 'dashboard',
    });
});

router.get("/edit/:id", withAuth, async (res, req) => {
    // To be able to find posts by primary key and render the edit post on the dashboard
})

module.exports = router;