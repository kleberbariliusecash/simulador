import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UseCash {
    precoPorLoja: Number = 300;
    formData: Number[] = [];
    resultados: Number[] = [];
    projecao: Number[] = [];
    melhorCenario: Number[] = [];
    piorCenario: Number[] = [];
    
    
}
