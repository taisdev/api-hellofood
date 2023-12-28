const express = require('express');

const {
  createPedido,
  getOnePedido,
  getPedidosCliente,
  getAllPedidos,
  getAllPedidosPerDate,
  updatePedido,
  deletePedido,
} = require('../controllers/pedidoController');

const router = new express.Router();

router.post('/', createPedido);
router.get('/:id', getOnePedido);
router.get('/cliente/:id', getPedidosCliente);
router.get('/', getAllPedidos);
router.get('/data/:dataInicio/:dataFim', getAllPedidosPerDate);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

module.exports = router;
