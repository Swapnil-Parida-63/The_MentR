const express = require('express');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const controller = require('./blog.controller');
const { blogIdSchema, createBlogSchema, listBlogSchema, updateBlogSchema } = require('./blog.validation');

const router = express.Router();

router.get('/', validate(listBlogSchema), controller.list);
router.get('/:id', validate(blogIdSchema), controller.get);
router.post('/', authenticate, authorize('Admin'), validate(createBlogSchema), controller.create);
router.patch('/:id', authenticate, authorize('Admin'), validate(updateBlogSchema), controller.update);
router.delete('/:id', authenticate, authorize('Admin'), validate(blogIdSchema), controller.remove);

module.exports = router;
