const express = require("express");
const router = express.Router();
const upload=multer({'dest':'uploads/'})
const { errorHandler } = require('../middleware')
/* GET posts index /posts */
const { 
	getPosts,
	newPost,
  createPost,
  showPost,
  editPost,
  postUpdate
} = require('../controllers/post');

/* GET posts index /posts */
router.get('/', errorHandler(getPosts));

/* GET posts new /posts/new */
router.get('/new', newPost);

/* POST posts create /posts */
router.post('/', upload.array('images',4) errorHandler(createPost));

/* GET posts show /posts/:id */
router.get('/:id', errorHandler(showPost));

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', editPost);

/* PUT posts update /posts/:id */
router.put('/:id',postUpdate);

/* DELETE posts destroy /posts/:id */
router.delete('/:id', (req, res, next) => {
  res.send('DELETE /posts/:id');
});


module.exports = router;