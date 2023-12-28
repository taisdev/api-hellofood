const express = require('express');

const {
  createItem,
  getAllItens,
  getAllItensApp,
  getOneItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

const router = new express.Router();

router.post('/', createItem);
router.get('/', getAllItens);
router.get('/app/', getAllItensApp);
router.get('/:id', getOneItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
