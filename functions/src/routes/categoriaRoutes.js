const express = require('express');

const {
  createCategoria,
  getAllCategorias,
  getOneCategoria,
  updateCategoria,
  deleteCategoria,
} = require('../controllers/categoriaController');

const router = new express.Router();

router.post('/', createCategoria);
router.get('/', getAllCategorias);
router.get('/:id', getOneCategoria);
router.put('/:id', updateCategoria);
router.delete('/:id', deleteCategoria);

module.exports = router;
