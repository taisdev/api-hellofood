class Endereco {
  constructor(endereco, numero, complemento, cidade, estado, cep, user) {
    this.endereco = endereco;
    this.numero = numero;
    this.complemento = complemento;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
    this.user = user;
  }
}

module.exports = Endereco;
