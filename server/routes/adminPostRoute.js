const express = require('express');
const router = express.Router();
const adminPostController = require('../controllers/adminPostController');


router.get('/posts', adminPostController.index);
router.post('/posts', adminPostController.store);
router.get('/posts/create', adminPostController.create);
router.get('/posts/:id/edit', adminPostController.edit);
router.get('/posts/:id', adminPostController.show);
router.put('/posts/:id', adminPostController.update);
router.delete('/posts/:id', adminPostController.destroy);



module.exports = router;