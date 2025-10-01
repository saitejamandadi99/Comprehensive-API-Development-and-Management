const express = require('express'); 
const router = express.Router(); 
const authMiddleware = require('../middleware/authMiddleware');

const {getAllUsers, getUserById, updateUserById, deleteUserById} = require('../controllers/userController');

router.get('/',authMiddleware, getAllUsers);
router.get('/:id',authMiddleware, getUserById);
router.put('/:id',authMiddleware, updateUserById);
router.delete('/:id',authMiddleware, deleteUserById);
module.exports = router;