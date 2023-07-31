const express = require('express');
const router = express.Router();
const controllers = require('../contollers/userControllers');

router.post('/new', controllers.add_user);
router.post('/:user_id/:book_id/:shelf_type', controllers.add_book_to_shelf);
router.post('/:user_id/:shelf_type', controllers.add_shelf);

module.exports = router;