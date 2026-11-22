import { ItemAcervo } from "./ItemAcervo";
import { Reservavel } from "../interfaces/Reservavel";
import { ItemIndisponivelError } from "../erros/ErrosAcervo";

export class Livro extends ItemAcervo implements Reservavel {
  private _reservadoPor: string | null = null;

  constructor(titulo: string, anoPublicacao: number, private _autor: string) {
    super(titulo, anoPublicacao);
  }

  get autor(): string {
    return this._autor;
  }

  get reservado(): boolean {
    return this._reservadoPor !== null;
  }

  reservar(nomeUsuario: string): void {
    if (this.reservado) {
      throw new ItemIndisponivelError(this.titulo, "já está reservado");
    }
    this._reservadoPor = nomeUsuario;
  }

  cancelarReserva(): void {
    this._reservadoPor = null;
  }

  override calcularMulta(diasAtraso: number): number {
    return diasAtraso * 0.5;
  }
}