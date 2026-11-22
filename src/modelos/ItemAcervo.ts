import { ItemIndisponivelError } from "../erros/ErrosAcervo";

export abstract class ItemAcervo {
  private static _contadorId = 0;

  public readonly id: number;
  private _emprestadoEm: Date | null = null;

  constructor(private _titulo: string, private _anoPublicacao: number) {
    this.id = ++ItemAcervo._contadorId;
  }

  get titulo(): string {
    return this._titulo;
  }

  get anoPublicacao(): number {
    return this._anoPublicacao;
  }

  // Propriedade calculada, sem duplicar estado
  get statusDisponibilidade(): string {
    return this._emprestadoEm === null ? "Disponível" : "Emprestado";
  }

  get diasEmprestado(): number {
    if (this._emprestadoEm === null) return 0;
    const ms = Date.now() - this._emprestadoEm.getTime();
    return Math.floor(ms / (1000 * 60 * 60 * 24));
  }

  emprestar(): void {
    if (this._emprestadoEm !== null) {
      throw new ItemIndisponivelError(this._titulo, "já está emprestado");
    }
    this._emprestadoEm = new Date();
  }

  devolver(): void {
    if (this._emprestadoEm === null) {
      throw new ItemIndisponivelError(this._titulo, "não está emprestado");
    }
    this._emprestadoEm = null;
  }

  abstract calcularMulta(diasAtraso: number): number;
}