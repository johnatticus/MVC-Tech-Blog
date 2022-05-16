const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  // get comments
  try {
      const commentData = await Comment.findAll({
        include: [
          {
            model: Comment,
            attributes: ['comment'],
          },
        ],
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// router.get("/", (req, res) => {
//   Comment.findAll()
//       .then((newComment) => res.json(newComment))
//       .catch((err) => {
//           console.log(err);
//           res.status(500).json(err);
//       });
// });

router.post("/", withAuth, async (req, res) => {
    // create a router to post comments to created posts
    try {
        const newComment = await Comment.create({
          ...req.body,
          user_id: req.session.user_id,
          
        });
    
        res.status(200).json(newComment);
      } catch (err) {
        res.status(400).json(err);
      }
});

module.exports = router;