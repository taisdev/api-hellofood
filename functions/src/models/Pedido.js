class Pedido {
  constructor(
    id,
    data,
    itens,
    total,
    formaPagamento,
    status,
    retirada,
    taxa,
    clienteId,
    user,
  ) {
    this.id = id;
    this.data = data;
    this.itens = itens;
    this.total = total;
    this.formaPagamento = formaPagamento;
    this.status = status;
    this.retirada = retirada;
    this.taxa = taxa;
    this.clienteId = clienteId;
    this.user = user;
  }
}

module.exports = Pedido;
