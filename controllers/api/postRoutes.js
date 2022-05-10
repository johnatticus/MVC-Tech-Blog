const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    // Create a post
    try {
        const newPost = await Post.create({
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.user_id,
        });
    
        res.status(200).json(newPost);
      } catch (err) {
        res.status(400).json(err);
      }
});

router.put("/:id", withAuth, async (req, res) => {
    // Update a post
    // THIS IS FROM MY ECOMMERCE BACK END...UNCOMMENT AND REFACTOR!
    // Product.update(req.body, {
    //     where: {
    //       id: req.params.id,
    //     },
    //   })
    //     .then((product) => {
    //       // find all associated tags from ProductTag
    //       return ProductTag.findAll({ where: { product_id: req.params.id } });
    //     })
    //     .then((productTags) => {
    //       // get list of current tag_ids
    //       const productTagIds = productTags.map(({ tag_id }) => tag_id);
    //       // create filtered list of new tag_ids
    //       const newProductTags = req.body.tagIds
    //         .filter((tag_id) => !productTagIds.includes(tag_id))
    //         .map((tag_id) => {
    //           return {
    //             product_id: req.params.id,
    //             tag_id,
    //           };
    //         });
    //       // figure out which ones to remove
    //       const productTagsToRemove = productTags
    //         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    //         .map(({ id }) => id);
    
    //       // run both actions
    //       return Promise.all([
    //         ProductTag.destroy({ where: { id: productTagsToRemove } }),
    //         ProductTag.bulkCreate(newProductTags),
    //       ]);
    //     })
    //     .then((updatedProductTags) => res.json(updatedProductTags))
    //     .catch((err) => {
    //       // console.log(err);
    //       res.status(400).json(err);
    //     });

});

router.delete("/:id", withAuth, async (req, res) => {
    // Delete the post
    try {
        const postData = await Post.destroy({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
    
        if (!postData) {
          res.status(404).json({ message: 'NO MATCHING POST WITH THIS ID!' });
          return;
        }
    
        res.status(200).json(postData);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;