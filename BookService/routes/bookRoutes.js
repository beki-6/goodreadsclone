const express = require('express');
const router = express.Router();
const controllers = require('../contollers/bookControllers');

router.post('/create_book', controllers.create_book);
router.post('/add_author', controllers.add_author);
router.get('/', controllers.get_all_books);

module.exports = router;