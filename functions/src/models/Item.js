class Item {
  constructor(id, nome, descricao, valor, tamanho, ativo, urlImage, refImage, categoriaId) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.valor = valor;
    this.tamanho = tamanho;
    this.ativo = ativo;
    this.urlImage = urlImage;
    this.refImage = refImage;
    this.categoriaId = categoriaId;
  }
}

module.exports = Item;
