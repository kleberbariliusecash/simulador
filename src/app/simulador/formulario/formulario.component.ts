import { Component, OnInit } from '@angular/core';
import { Simula } from '../shared/simula';
import { ResultadoAtual } from '../shared/resultadoAtual';
import  {  FormBuilder,  FormGroup  }  from  '@angular/forms';

@Component({
  selector: 'sim-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private ra: ResultadoAtual
    
  ) { }

  ngOnInit() {
    this.createForm(new Simula());
    
  }

  createForm(simula: Simula) {
    this.form = this.formBuilder.group({
      qtdMes: [simula.qtdMes],
      qtdLojas: [simula.qtdLojas],
      ticketMedio: [simula.ticketMedio],
      qtdVendedoresLoja: [simula.qtdVendedoresLoja],
      qtdVendedores: [simula.qtdVendedores],
      simulado: [simula.simulado],
    })
  }
  

  onSubmit() {
  
    let vendaMensal = Number(this.form.value.ticketMedio) * Number(this.form.value.qtdMes)
    let vendaAnual = vendaMensal * 12
    let mediaSemanalVendedor = Number(this.form.value.qtdMes) / Number(this.form.value.qtdVendedores) / 4
    let mediaDiariaVendedor = mediaSemanalVendedor / 6
    //logica
    //console.log(Number(this.form.value.qtdMes)+Number(this.form.value.qtdMes));
    this.ra.resultados.push(vendaMensal, vendaAnual, mediaDiariaVendedor, mediaSemanalVendedor, 1)//1 = true
    
    this.projecao()
    
  }

  projecao(){
    if(this.ra.resultados[4]===1){
      alert("É uma")
    }
     
    
  }

}
