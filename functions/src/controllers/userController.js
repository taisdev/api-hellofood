const admin = require('../../admin');
const User = require('../models/User');

const db = admin.firestore();

const createUser = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('users').doc().set(data);
    res.status(201).send('Usuário cadastrado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const signIn = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = db.collection('users');
    user.where('name', '==', name);
    user.where('password', '==', password);
    const data = await user.get();
    if (!data.exists) {
      res.status(404).send('Usuário não encontrado');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const funcionario = db.collection('users').doc(id);
    const data = await funcionario.get();
    if (!data.exists) {
      res.status(404).send('Usuário não encontrado');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const Users = db.collection('users');
    const data = await Users.get();
    const UsersArray = [];
    if (data.empty) {
      res.status(404).send('Nenhum usuário cadastrado');
    } else {
      data.forEach((doc) => {
        const user = new User(
          doc.id,
          doc.data().name,
          doc.data().password,
          doc.data().typeAccount,
        );
        UsersArray.push(user);
      });
      res.send(UsersArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const funcionario = db.collection('users').doc(id);
    await funcionario.update(data);
    res.send('Usuário atualizado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('users').doc(id).delete();
    res.send('Usuário deletado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createUser,
  signIn,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
