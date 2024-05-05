const express = require('express');
const { create, getAll, getByID, remove, update } = require('../controllers/sportsbooking.controller.js');

const router = express.Router();

router.post('/create', create)
router.get('/getsportsbookings', getAll);
router.get('/getsportsbooking/:id', getByID); 
router.put('/updatesportsbooking/:id', update);
router.delete('/deletesportsbooking/:id', remove);

module.exports = router;