const admin = require('../../admin');
// const Funcionario = require('../models/Funcionario');

const db = admin.firestore();
const auth = admin.auth();

const createFuncionario = async (req, res) => {
  try {
    const {
      nome, email, password, perfil, cargo,
    } = req.body;

    const userRecord = await auth.createUser({
      email,
      password,
    });

    const { uid } = userRecord;

    await db.collection('users').doc(uid).set({
      email,
      password,
      typeAccount: perfil,
    });

    await db.collection('funcionarios').doc(uid).set({
      nome,
      email,
      perfil,
      cargo,
    });

    res.status(201).send('Usuário cadastrado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneFuncionario = async (req, res) => {
  try {
    const { id } = req.params;

    // Consultar coleção "funcionarios"
    const funcionarioRef = db.collection('funcionarios').doc(id);
    const funcionarioData = await funcionarioRef.get();

    if (!funcionarioData.exists) {
      res.status(404).send('Funcionário não encontrado');
      return;
    }

    // Consultar coleção "users"
    const usersRef = db.collection('users').doc(id);
    const usersData = await usersRef.get();

    if (!usersData.exists) {
      res.status(404).send('Usuário não encontrado');
      return;
    }

    // Combinar os dados das duas coleções em um único objeto
    const funcionario = funcionarioData.data();
    const users = usersData.data();
    const responseData = { ...funcionario, ...users };

    res.send(responseData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllFuncionarios = async (req, res) => {
  try {
    const funcionariosRef = db.collection('funcionarios');
    const funcionariosData = await funcionariosRef.get();
    const funcionariosArray = [];

    if (funcionariosData.empty) {
      res.status(404).send('Nenhum funcionário cadastrado');
    } else {
      await Promise.all(
        funcionariosData.docs.map(async (doc) => {
          const funcionarioId = doc.id;
          const funcionario = doc.data();
          const usersRef = db.collection('users').doc(funcionarioId);
          const usersData = await usersRef.get();
          const users = usersData.exists ? usersData.data() : {};
          const responseData = { id: funcionarioId, ...funcionario, ...users };
          funcionariosArray.push(responseData);
        }),
      );

      res.send(funcionariosArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const funcionarioRef = db.collection('funcionarios').doc(id);
    await funcionarioRef.update({
      nome: data.nome,
      email: data.email,
      perfil: data.perfil,
      cargo: data.cargo,
    });

    const userRef = db.collection('users').doc(id);
    await userRef.update({
      user: data.email,
      password: data.password,
      typeAccount: data.perfil,
    });

    const user = await auth.getUser(id);
    await auth.updateUser(user.uid, {
      email: data.user,
      password: data.password,
    });

    res.send('Funcionário atualizado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteFuncionario = async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('funcionarios').doc(id).delete();

    await db.collection('users').doc(id).delete();

    await auth.deleteUser(id);

    res.send('Funcionário excluído com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createFuncionario,
  getAllFuncionarios,
  getOneFuncionario,
  updateFuncionario,
  deleteFuncionario,
};
