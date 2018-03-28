const express = require('express');
const router = express.Router();
const {findAll, findById, destroy, update, create} = require('../controllers/posts.controllers')
const {sendUploadToGCS} = require('../middlewares/uploadGCS') 
const multer = require('multer')

const upload = multer({
   storage  : multer.memoryStorage(),
   limits   : {
     fileSize: 10*1024*1024
  } 
})

router.get('/', findAll);
router.post('/',upload.single('post'),sendUploadToGCS, create);

router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', destroy);


module.exports = router;