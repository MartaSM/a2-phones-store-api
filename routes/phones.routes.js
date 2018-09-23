const express = require('express');
const router = express.Router();
const phonesController = require('../controller/phones.controller')

router.get('/', phonesController.list);
router.delete('/:id', phonesController.delete);


module.exports = router;
