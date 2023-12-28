const express = require('express');

const {
  createEstabelecimento,
  getOneEstabelecimento,
  getEstabelecimento,
  updateEstabelecimento,
  deleteEstabelecimento,
} = require('../controllers/estabelecimentoController');

const router = new express.Router();

router.post('/', createEstabelecimento);
router.get('/', getEstabelecimento);
router.get('/loja/', getOneEstabelecimento);
router.put('/:id', updateEstabelecimento);
router.delete('/:id', deleteEstabelecimento);

module.exports = router;
