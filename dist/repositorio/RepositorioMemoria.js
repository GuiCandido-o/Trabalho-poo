"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioMemoria = void 0;
const ErrosAcervo_1 = require("../erros/ErrosAcervo");
class RepositorioMemoria {
    constructor() {
        this._itens = [];
    }
    adicionar(item) {
        this._itens.push(item);
    }
    listar() {
        return [...this._itens];
    }
    get quantidade() {
        return this._itens.length;
    }
    buscarPorId(id) {
        const item = this._itens.find((i) => i.id === id);
        if (!item)
            throw new ErrosAcervo_1.ItemNaoEncontradoError(id);
        return item;
    }
    // Partial<T>: o filtro pode ter apenas algumas propriedades de T
    buscarPor(filtro) {
        const chaves = Object.keys(filtro);
        return this._itens.filter((item) => chaves.every((chave) => item[chave] === filtro[chave]));
    }
    remover(id) {
        const indice = this._itens.findIndex((i) => i.id === id);
        if (indice === -1)
            throw new ErrosAcervo_1.ItemNaoEncontradoError(id);
        this._itens.splice(indice, 1);
    }
}
exports.RepositorioMemoria = RepositorioMemoria;
