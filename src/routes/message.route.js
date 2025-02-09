const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/auth.middleware');
const messageController = require('../controllers/message.controller');

router.get("/users", authMiddleware, messageController.getUsersForSidebar);
router.get("/:id", authMiddleware, messageController.getMessages);
router.post("/send/:id", authMiddleware, messageController.sendMessage);

module.exports = router;