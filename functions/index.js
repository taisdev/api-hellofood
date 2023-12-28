const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const estabelecimentoRoutes = require('./src/routes/estabelecimentoRoutes');
const enderecoRoutes = require('./src/routes/enderecoRoutes');
const funcionarioRoutes = require('./src/routes/funcionarioRoutes');
const itemRoutes = require('./src/routes/itemRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

// Routes
app.use('/user', userRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/cliente', clienteRoutes);
app.use('/estabelecimento', estabelecimentoRoutes);
app.use('/endereco', enderecoRoutes);
app.use('/funcionario', funcionarioRoutes);
app.use('/item', itemRoutes);
app.use('/pedido', pedidoRoutes);

exports.app = functions.https.onRequest(app);
