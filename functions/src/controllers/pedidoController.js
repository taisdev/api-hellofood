const { parse, isAfter, isBefore } = require('date-fns');
const admin = require('../../admin');
const Pedido = require('../models/Pedido');

const db = admin.firestore();

const createPedido = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('pedidos').doc().set(data);
    res.status(201).send('Pedido cadastrado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOnePedido = async (req, res) => {
  const { id } = req.params;
  try {
    const pedidoRef = db.collection('pedidos').doc(id);
    const doc = await pedidoRef.get();
    if (!doc.exists) {
      res.status(404).send('Pedido não encontrado');
    } else {
      res.send(doc.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPedidosCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const pedidosRef = db.collection('pedidos');
    const snapshot = await pedidosRef.where('clienteId', '==', id).get();
    const pedidosArray = [];
    if (snapshot.empty) {
      res.status(404).send('Cliente não possui pedidos');
      return;
    }
    snapshot.forEach((doc) => {
      const pedido = new Pedido(
        doc.id,
        doc.data().data,
        doc.data().itens,
        doc.data().total,
        doc.data().formaPagamento,
        doc.data().status,
        doc.data().retirada,
        doc.data().taxa,
        doc.data().clienteId,
        doc.data().user,
      );
      pedidosArray.push(pedido);
    });
    res.send(pedidosArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPedidos = async (req, res) => {
  try {
    const pedidos = db.collection('pedidos');
    const data = await pedidos.get();
    const pedidosArray = [];
    if (data.empty) {
      res.status(404).send('Nenhum pedido cadastrado');
    } else {
      data.forEach((doc) => {
        const pedido = new Pedido(
          doc.id,
          doc.data().data,
          doc.data().itens,
          doc.data().total,
          doc.data().formaPagamento,
          doc.data().status,
          doc.data().retirada,
          doc.data().taxa,
          doc.data().clienteId,
          doc.data().user,
        );
        pedidosArray.push(pedido);
      });
      res.send(pedidosArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPedidosPerDate = async (req, res) => {
  const { dataInicio, dataFim } = req.params;

  const converterData = (dataString, hora) => {
    const [dia, mes, ano] = dataString.split('-');
    const [horaSplit, minuto, segundo] = hora.split(':');

    return parse(
      `${ano}-${mes}-${dia}T${horaSplit}:${minuto}:${segundo}`,
      'yyyy-MM-dd\'T\'HH:mm:ss',
      new Date(),
    );
  };

  const dataInicioFormatted = converterData(dataInicio, '00:00:00');
  const dataFimFormatted = converterData(dataFim, '23:59:59');

  try {
    const snapshot = await db.collection('pedidos').get();

    const pedidosArray = [];
    snapshot.forEach((doc) => {
      const dataDocumento = converterData(doc.data().data.split(' ')[0], doc.data().data.split(' ')[1]);
      if (
        isAfter(dataDocumento, dataInicioFormatted)
        && isBefore(dataDocumento, dataFimFormatted)
      ) {
        const pedido = new Pedido(
          doc.id,
          doc.data().data,
          doc.data().itens,
          doc.data().total,
          doc.data().formaPagamento,
          doc.data().status,
          doc.data().retirada,
          doc.data().taxa,
          doc.data().clienteId,
          doc.data().user,
        );
        pedidosArray.push(pedido);
      }
    });

    res.status(200).send(pedidosArray);
  } catch (error) {
    res.status(500).send('Erro ao consultar pedidos.');
  }
};

const updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const pedido = db.collection('pedidos').doc(id);
    await pedido.update(data);
    res.send('Pedido atualizado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('pedidos').doc(id).delete();
    res.send('Pedido deletado com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createPedido,
  getOnePedido,
  getPedidosCliente,
  getAllPedidos,
  getAllPedidosPerDate,
  updatePedido,
  deletePedido,
};
