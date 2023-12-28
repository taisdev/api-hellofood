const express = require('express');

const {
  createEndereco,
  getOneEndereco,
  updateEndereco,
  deleteEndereco,
} = require('../controllers/enderecoController');

const router = new express.Router();

router.post('/:id', createEndereco);
router.get('/:id', getOneEndereco);
router.put('/:id', updateEndereco);
router.delete('/:id', deleteEndereco);

module.exports = router;
