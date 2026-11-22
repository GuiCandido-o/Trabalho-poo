import { ItemNaoEncontradoError } from "../erros/ErrosAcervo";

export interface ComId {
  readonly id: number;
}

export class RepositorioMemoria<T extends ComId> {
  private _itens: T[] = [];

  adicionar(item: T): void {
    this._itens.push(item);
  }

  listar(): readonly T[] {
    return [...this._itens];
  }

  get quantidade(): number {
    return this._itens.length;
  }

  buscarPorId(id: number): T {
    const item = this._itens.find((i) => i.id === id);
    if (!item) throw new ItemNaoEncontradoError(id);
    return item;
  }

  // Partial<T>: o filtro pode ter apenas algumas propriedades de T
  buscarPor(filtro: Partial<T>): T[] {
    const chaves = Object.keys(filtro) as (keyof T)[];
    return this._itens.filter((item) =>
      chaves.every((chave) => item[chave] === filtro[chave])
    );
  }

  remover(id: number): void {
    const indice = this._itens.findIndex((i) => i.id === id);
    if (indice === -1) throw new ItemNaoEncontradoError(id);
    this._itens.splice(indice, 1);
  }
}