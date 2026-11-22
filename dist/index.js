"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Livro_1 = require("./modelos/Livro");
const JogoEletronico_1 = require("./modelos/JogoEletronico");
const RepositorioMemoria_1 = require("./repositorio/RepositorioMemoria");
const ErrosAcervo_1 = require("./erros/ErrosAcervo");
function resumir(item) {
    return {
        id: item.id,
        titulo: item.titulo,
        statusDisponibilidade: item.statusDisponibilidade,
    };
}
const repo = new RepositorioMemoria_1.RepositorioMemoria();
const livro = new Livro_1.Livro("Dom Casmurro", 1899, "Machado de Assis");
const jogo = new JogoEletronico_1.JogoEletronico("Zelda", 2017, "Switch");
repo.adicionar(livro);
repo.adicionar(jogo);
console.log("=== Acervo ===");
repo.listar().forEach((item) => console.log(resumir(item)));
console.log("\n=== Empréstimo ===");
livro.emprestar();
console.log(resumir(livro));
try {
    livro.emprestar();
}
catch (e) {
    if (e instanceof ErrosAcervo_1.AcervoError)
        console.log(`${e.name}: ${e.message}`);
}
livro.devolver();
console.log(resumir(livro));
console.log("\n=== Multas (10 dias de atraso) ===");
console.log(`${livro.titulo}: R$ ${livro.calcularMulta(10).toFixed(2)}`);
console.log(`${jogo.titulo}: R$ ${jogo.calcularMulta(10).toFixed(2)}`);
console.log("\n=== Reserva (interface Reservavel) ===");
livro.reservar("Maria");
console.log(`Reservado? ${livro.reservado}`);
try {
    livro.reservar("João");
}
catch (e) {
    if (e instanceof ErrosAcervo_1.AcervoError)
        console.log(`${e.name}: ${e.message}`);
}
livro.cancelarReserva();
console.log("\n=== Busca no repositório ===");
console.log(repo.buscarPor({ titulo: "Zelda" }).map(resumir));
try {
    repo.buscarPorId(999);
}
catch (e) {
    if (e instanceof ErrosAcervo_1.ItemNaoEncontradoError)
        console.log(`${e.name}: ${e.message}`);
}
repo.remover(jogo.id);
console.log(`\nItens no acervo após remover: ${repo.quantidade}`);
