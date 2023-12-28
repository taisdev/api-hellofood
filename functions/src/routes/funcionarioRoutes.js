const express = require('express');

const {
  createFuncionario,
  getAllFuncionarios,
  getOneFuncionario,
  updateFuncionario,
  deleteFuncionario,
} = require('../controllers/funcionarioController');

const router = new express.Router();

router.post('/', createFuncionario);
router.get('/', getAllFuncionarios);
router.get('/:id', getOneFuncionario);
router.put('/:id', updateFuncionario);
router.delete('/:id', deleteFuncionario);

module.exports = router;
