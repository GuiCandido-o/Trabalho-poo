"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemIndisponivelError = exports.ItemNaoEncontradoError = exports.AcervoError = void 0;
class AcervoError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = new.target.name;
    }
}
exports.AcervoError = AcervoError;
class ItemNaoEncontradoError extends AcervoError {
    constructor(id) {
        super(`Item com id ${id} não encontrado.`);
    }
}
exports.ItemNaoEncontradoError = ItemNaoEncontradoError;
class ItemIndisponivelError extends AcervoError {
    constructor(titulo, motivo) {
        super(`O item "${titulo}" está indisponível: ${motivo}`);
    }
}
exports.ItemIndisponivelError = ItemIndisponivelError;
