"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemAcervo = void 0;
const ErrosAcervo_1 = require("../erros/ErrosAcervo");
class ItemAcervo {
    constructor(_titulo, _anoPublicacao) {
        this._titulo = _titulo;
        this._anoPublicacao = _anoPublicacao;
        this._emprestadoEm = null;
        this.id = ++ItemAcervo._contadorId;
    }
    get titulo() {
        return this._titulo;
    }
    get anoPublicacao() {
        return this._anoPublicacao;
    }
    // Propriedade calculada, sem duplicar estado
    get statusDisponibilidade() {
        return this._emprestadoEm === null ? "Disponível" : "Emprestado";
    }
    get diasEmprestado() {
        if (this._emprestadoEm === null)
            return 0;
        const ms = Date.now() - this._emprestadoEm.getTime();
        return Math.floor(ms / (1000 * 60 * 60 * 24));
    }
    emprestar() {
        if (this._emprestadoEm !== null) {
            throw new ErrosAcervo_1.ItemIndisponivelError(this._titulo, "já está emprestado");
        }
        this._emprestadoEm = new Date();
    }
    devolver() {
        if (this._emprestadoEm === null) {
            throw new ErrosAcervo_1.ItemIndisponivelError(this._titulo, "não está emprestado");
        }
        this._emprestadoEm = null;
    }
}
exports.ItemAcervo = ItemAcervo;
ItemAcervo._contadorId = 0;
