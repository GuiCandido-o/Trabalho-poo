import { ItemAcervo } from "./modelos/ItemAcervo";
import { Livro } from "./modelos/Livro";
import { JogoEletronico } from "./modelos/JogoEletronico";
import { RepositorioMemoria } from "./repositorio/RepositorioMemoria";
import { AcervoError, ItemNaoEncontradoError } from "./erros/ErrosAcervo";

// Utility Types: Pick escolhe só algumas propriedades, Readonly impede alteração
type ResumoItem = Readonly<Pick<ItemAcervo, "id" | "titulo" | "statusDisponibilidade">>;

function resumir(item: ItemAcervo): ResumoItem {
  return {
    id: item.id,
    titulo: item.titulo,
    statusDisponibilidade: item.statusDisponibilidade,
  };
}

const repo = new RepositorioMemoria<ItemAcervo>();

const livro = new Livro("Dom Casmurro", 1899, "Machado de Assis");
const jogo = new JogoEletronico("Zelda", 2017, "Switch");

repo.adicionar(livro);
repo.adicionar(jogo);

console.log("=== Acervo ===");
repo.listar().forEach((item) => console.log(resumir(item)));

console.log("\n=== Empréstimo ===");
livro.emprestar();
console.log(resumir(livro));

try {
  livro.emprestar();
} catch (e) {
  if (e instanceof AcervoError) console.log(`${e.name}: ${e.message}`);
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
} catch (e) {
  if (e instanceof AcervoError) console.log(`${e.name}: ${e.message}`);
}
livro.cancelarReserva();

console.log("\n=== Busca no repositório ===");
console.log(repo.buscarPor({ titulo: "Zelda" }).map(resumir));

try {
  repo.buscarPorId(999);
} catch (e) {
  if (e instanceof ItemNaoEncontradoError) console.log(`${e.name}: ${e.message}`);
}

repo.remover(jogo.id);
console.log(`\nItens no acervo após remover: ${repo.quantidade}`);