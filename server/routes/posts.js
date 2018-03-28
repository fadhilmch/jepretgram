const express = require('express');
const router = express.Router();
const {findAll, findById, destroy, update, create, toggleLike} = require('../controllers/posts.controllers');
const {sendUploadToGCS} = require('../middlewares/uploadGCS') ;
const {checkAuth} = require('../middlewares/auth');
const multer = require('multer')

const upload = multer({
   storage  : multer.memoryStorage(),
   limits   : {
     fileSize: 10*1024*1024
  } 
})

router.get('/', checkAuth, findAll);
router.post('/',upload.single('post'),sendUploadToGCS, checkAuth, create);

router.get('/:id', checkAuth, findById);
router.put('/:id', checkAuth, update);
router.delete('/:id', checkAuth, destroy);
router.post('/:id/like', checkAuth, toggleLike)



module.exports = router;