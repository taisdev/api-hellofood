const admin = require('../../admin');
const Endereco = require('../models/Endereco');

const db = admin.firestore();

const createEndereco = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const citiesRef = db.collection('clientes');
    await citiesRef.doc(id).collection('endereco').doc().set(data);
    res.status(201).send('Endereco cadastrado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneEndereco = async (req, res) => {
  const { id } = req.params;
  try {
    const querySnapshot = await db.collectionGroup('endereco').where('user', '==', id).get();
    if (querySnapshot.empty) {
      res.status(404).send('Nenhum item cadastrado');
    } else {
      querySnapshot.forEach((doc) => {
        const endereco = new Endereco(
          doc.id,
          doc.data().endereco,
          doc.data().numero,
          doc.data().complemento,
          doc.data().cidade,
          doc.data().estado,
          doc.data().cep,
          doc.data().user,
        );
        res.send(endereco);
      });
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
};

/*
const getAllEnderecos = async (req, res) => {
  const { id } = req.params;
  try {
    const itens = db.collection('users').doc(id).collection('endereco');
    const data = await itens.get();
    const itensArray = [];
    if (data.empty) {
      res.status(404).send('Nenhum item cadastrado');
    } else {
      data.forEach((doc) => {
        const endereco = new Endereco(
          doc.id,
          doc.data().endereco,
          doc.data().numero,
          doc.data().complemento,
          doc.data().cidade,
          doc.data().estado,
          doc.data().cep,
          doc.data().user,
        );
        itensArray.push(endereco);
      });
      res.send(itensArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
* */

const updateEndereco = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const endereco = db.collection('clientes').doc(id).collection('endereco');
    await endereco.update(data);
    res.send('Item atualizado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteEndereco = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('endereco').doc(id).delete();
    res.send('Endereco deletado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createEndereco,
  getOneEndereco,
  updateEndereco,
  deleteEndereco,
};
