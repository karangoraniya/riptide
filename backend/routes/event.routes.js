const express = require("express");
const router = express.Router();
const { getEventIds, saveEventId } = require('../controllers/event.controller');

router.post('/events', saveEventId);
router.get('/events', getEventIds);


module.exports = router;



