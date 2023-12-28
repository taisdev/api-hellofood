class Cliente {
  constructor(id, nome, telefone, endereco, createdAt) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
    this.createdAt = createdAt;
  }
}

module.exports = Cliente;
