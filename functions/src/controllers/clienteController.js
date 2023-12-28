const admin = require('../../admin');
const Cliente = require('../models/Cliente');
const Endereco = require('../models/Endereco');

const db = admin.firestore();

const createCliente = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('clientes').doc().set(data);
    res.status(201).send('Cliente cadastrado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = db.collection('clientes').doc(id);
    const data = await cliente.get();
    if (!data.exists) {
      res.status(404).send('Cliente não encontrado');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllClientes = async (req, res) => {
  try {
    const clientes = db.collection('clientes');
    const data = await clientes.get();
    const clientesArray = [];
    if (data.empty) {
      res.status(404).send('Nenhum Cliente cadastrado');
    } else {
      data.forEach((doc) => {
        const cliente = new Cliente(
          doc.id,
          doc.data().nome,
          doc.data().telefone,
          doc.data().endereco,
          doc.data().createdAt,
        );
        clientesArray.push(cliente);
      });
      res.send(clientesArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getEndereco = async (req, res) => {
  try {
    const { id } = req.params;
    const clientes = db.collection('clientes').doc(id);
    const doc = await clientes.get();
    const clientesArray = [];
    if (!doc.exists) {
      res.status(400).send('Não existe endereco cadastrado');
    } else {
      const endereco = new Endereco(
        doc.data().endereco,
        doc.data().numero,
        doc.data().complemento,
        doc.data().cidade,
        doc.data().estado,
        doc.data().cep,
      );

      clientesArray.push(endereco);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const cliente = db.collection('clientes').doc(id);
    await cliente.update(data);
    res.send('Cliente atualizado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addEndereco = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    db.collection('clientes').doc(id).update({
      endereco: {
        endereco: data.endereco,
        numero: data.numero,
        complemento: data.complemento,
        cidade: data.cidade,
        estado: data.estado,
        cep: data.cep,
      },
    }, {
      merge: true,
    });

    res.send('Endereco atualizado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('clientes').doc(id).delete();
    res.send('Cliente deletado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createCliente,
  getAllClientes,
  getEndereco,
  getOneCliente,
  updateCliente,
  addEndereco,
  deleteCliente,
};
