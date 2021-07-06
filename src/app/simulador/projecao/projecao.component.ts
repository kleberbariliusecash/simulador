import { Component, OnInit, Input } from '@angular/core';
import { ResultadoAtual } from '../shared/resultadoAtual';
import { Teste } from './teste.model';

@Component({
  selector: 'sim-projecao',
  templateUrl: './projecao.component.html',
  styleUrls: ['./projecao.component.css']
})
export class ProjecaoComponent implements OnInit {
  

  @Input() t: Teste

  constructor(
    
    private ra: ResultadoAtual
  ) {

   }

  ngOnInit() {
   
  }

  teste(){
    alert(this.ra.resultados[4])///testar caso estiver ativo
  }

}
