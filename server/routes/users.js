var express = require('express');
var router = express.Router();
var {getUserId, signIn, signUp, findAll, destroy, create} = require('../controllers/users.controllers');

router.get('/', findAll);
router.post('/signin', signIn);
router.post('/signup', signUp);
router.delete('/:id', destroy);
router.get('/id', getUserId);
// router.post('/', create);

module.exports = router;
