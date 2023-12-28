const admin = require('../../admin');
const Estabelecimento = require('../models/Estabelecimento');

const db = admin.firestore();

const createEstabelecimento = async (req, res) => {
  try {
    const data = req.body;
    const docRef = db.collection('estabelecimentos').doc('estabelecimentoId');
    await docRef.set(data, { merge: true });
    res.status(201).send('Estabelecimento cadastrado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getEstabelecimento = async (req, res) => {
  try {
    const estabelecimentosRef = db.collection('estabelecimentos');
    const snapshot = await estabelecimentosRef.get();
    const estabelecimentos = [];
    if (snapshot.empty) {
      res.status(404).send('Nenhum pedido cadastrado');
    } else {
      snapshot.forEach((doc) => {
        const estabelecimento = new Estabelecimento(
          doc.id,
          doc.data().nome,
          doc.data().cnpj,
          doc.data().responsavel,
          doc.data().email,
          doc.data().telefone,
          doc.data().endereco,
          doc.data().open,
        );
        estabelecimentos.push(estabelecimento);
      });
      res.status(200).json(estabelecimentos);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneEstabelecimento = async (req, res) => {
  try {
    const estabelecimento = db.collection('estabelecimentos').doc('estabelecimentoId');
    const data = await estabelecimento.get();
    if (!data.exists) {
      res.status(404).send('Estabelecimento não encontrado');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateEstabelecimento = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const estabelecimentoRef = db.collection('estabelecimentos').doc(id);
    const doc = await estabelecimentoRef.get();
    if (!doc.exists) {
      res.status(404).send('Estabelecimento não encontrado');
    }
    await estabelecimentoRef.update(data);
    res.status(200).send('Estabelecimento atualizado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteEstabelecimento = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('estabelecimentos').doc(id).delete();
    res.send('Usuário deletado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createEstabelecimento,
  getOneEstabelecimento,
  getEstabelecimento,
  updateEstabelecimento,
  deleteEstabelecimento,
};
