class Estabelecimento {
  constructor(
    id,
    nome,
    cnpj,
    endereço,
    responsavel,
    telefone,
    email,
    horarioFuncionamento,
    open,
  ) {
    this.id = id;
    this.nome = nome;
    this.cnpj = cnpj;
    this.endereço = endereço;
    this.responsavel = responsavel;
    this.telefone = telefone;
    this.email = email;
    this.horarioFuncionamento = horarioFuncionamento;
    this.open = open;
  }
}

module.exports = Estabelecimento;
