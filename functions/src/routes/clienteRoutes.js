const express = require('express');

const {
  createCliente,
  getAllClientes,
  getOneCliente,
  getEndereco,
  updateCliente,
  addEndereco,
  deleteCliente,
} = require('../controllers/clienteController');

const router = new express.Router();

router.post('/', createCliente);
router.get('/', getAllClientes);
router.get('/:id', getOneCliente);
router.get('/endereco/:id', getEndereco);
router.put('/:id', updateCliente);
router.put('/endereco/:id', addEndereco);
router.delete('/:id', deleteCliente);

module.exports = router;
