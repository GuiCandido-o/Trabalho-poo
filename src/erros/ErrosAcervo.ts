export class AcervoError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = new.target.name;
  }
}

export class ItemNaoEncontradoError extends AcervoError {
  constructor(id: number) {
    super(`Item com id ${id} não encontrado.`);
  }
}

export class ItemIndisponivelError extends AcervoError {
  constructor(titulo: string, motivo: string) {
    super(`O item "${titulo}" está indisponível: ${motivo}`);
  }
}