import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ResultadoAtual {
    vendaMensal: number;
    mediaVendedorSemana: number;
    mediaVendedorDia: number;
    vendaAnual: number;
    resultados: Number[] = [];
    
}
