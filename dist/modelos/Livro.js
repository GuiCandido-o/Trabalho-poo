"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const ItemAcervo_1 = require("./ItemAcervo");
const ErrosAcervo_1 = require("../erros/ErrosAcervo");
class Livro extends ItemAcervo_1.ItemAcervo {
    constructor(titulo, anoPublicacao, _autor) {
        super(titulo, anoPublicacao);
        this._autor = _autor;
        this._reservadoPor = null;
    }
    get autor() {
        return this._autor;
    }
    get reservado() {
        return this._reservadoPor !== null;
    }
    reservar(nomeUsuario) {
        if (this.reservado) {
            throw new ErrosAcervo_1.ItemIndisponivelError(this.titulo, "já está reservado");
        }
        this._reservadoPor = nomeUsuario;
    }
    cancelarReserva() {
        this._reservadoPor = null;
    }
    calcularMulta(diasAtraso) {
        return diasAtraso * 0.5;
    }
}
exports.Livro = Livro;
