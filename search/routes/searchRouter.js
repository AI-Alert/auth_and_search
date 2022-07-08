const Router = require("express");
const router = new Router();
const postController = require('../controllers/postConroller')

router.get("/post", postController.getAllPostsSearch);

router.get('/post/:id', postController.getOnePostSearch);

router.post('/post', postController.postOnePost);

router.put('/post/:id', postController.changeOnePost);

router.delete('/post/:id', postController.deleteOnePost);

module.exports = router;