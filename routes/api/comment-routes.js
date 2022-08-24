const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// ADD comment at /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);


// REMOVE comment at api/coments/<pizzaId>/<commentId>
// need two parameters to know exactly which pizza the comment originated from
router.route('/:pizzaId/:commentId').delete(removeComment)

module.exports = router;