const admin = require('../../admin');
const Categoria = require('../models/Categoria');

const db = admin.firestore();
const createCategoria = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('categorias').doc().set(data);
    res.status(201).send('Categoria cadastrada com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = db.collection('categorias').doc(id);
    const data = await categoria.get();
    if (!data.exists) {
      res.status(404).send('Categoria não encontrada');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllCategorias = async (req, res) => {
  try {
    const categorias = db.collection('categorias');
    const data = await categorias.orderBy('descricao').get();
    const categoriasArray = [];
    if (data.empty) {
      res.status(404).send('Nenhuma categoria cadastrada');
    } else {
      data.forEach((doc) => {
        const categoria = new Categoria(
          doc.id,
          doc.data().descricao,
          doc.data().urlImage,
          doc.data().refImage,
        );
        categoriasArray.push(categoria);
      });
      res.send(categoriasArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const categoria = db.collection('categorias').doc(id);
    await categoria.update(data);
    res.send('Categoria atualizada com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('categorias').doc(id).delete();
    res.send('Categoria deletada com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createCategoria,
  getAllCategorias,
  getOneCategoria,
  updateCategoria,
  deleteCategoria,
};
