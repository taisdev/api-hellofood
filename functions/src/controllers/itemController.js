const admin = require('../../admin');
const Item = require('../models/Item');

const db = admin.firestore();
const createItem = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('itens').doc().set(data);
    res.status(201).send('Item cadastrado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneItem = async (req, res) => {
  try {
    const { id } = req.params;
    const itens = db.collection('itens').doc(id);
    const data = await itens.get();
    if (!data.exists) {
      res.status(404).send('Item não encontrado');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllItens = async (req, res) => {
  try {
    const itens = db.collection('itens');
    const data = await itens.orderBy('nome').get();
    const itensArray = [];
    if (data.empty) {
      res.status(404).send('Nenhum item cadastrado');
    } else {
      data.forEach((doc) => {
        const item = new Item(
          doc.id,
          doc.data().nome,
          doc.data().descricao,
          doc.data().valor,
          doc.data().tamanho,
          doc.data().ativo,
          doc.data().urlImage,
          doc.data().refImage,
          doc.data().categoriaId,
        );
        itensArray.push(item);
      });
      res.send(itensArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllItensApp = async (req, res) => {
  try {
    const itens = db.collection('itens');
    const snapshot = await itens.where('ativo', '==', true).orderBy('nome').get();
    const itensArray = [];

    if (snapshot.empty) {
      res.status(404).send('Nenhum item ativo cadastrado');
    } else {
      snapshot.forEach((doc) => {
        const item = new Item(
          doc.id,
          doc.data().nome,
          doc.data().descricao,
          doc.data().valor,
          doc.data().tamanho,
          doc.data().ativo,
          doc.data().urlImage,
          doc.data().refImage,
          doc.data().categoriaId,
        );
        itensArray.push(item);
      });
      res.send(itensArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const itens = db.collection('itens').doc(id);
    await itens.update(data);
    res.send('Item atualizado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('itens').doc(id).delete();
    res.send('Item deletado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createItem,
  getAllItens,
  getAllItensApp,
  getOneItem,
  updateItem,
  deleteItem,
};
