const express = require('express');

const {
  createUser,
  signIn,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = new express.Router();
router.post('/', createUser);
router.post('/login', signIn);
router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
