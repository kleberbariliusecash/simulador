import { Component, OnInit } from '@angular/core';
import { Simula } from '../shared/simula';
import { UseCash } from '../shared/useCash';
import  {  FormBuilder,  FormGroup  }  from  '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'sim-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private use: UseCash,
    private route: ActivatedRoute,
    private router: Router
    
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
      simulado: [simula.simulado],
    })
  }
  

  onSubmit() {

    let qtdVendedores = this.form.value.qtdLojas * this.form.value.qtdVendedoresLoja
    let vendaMensal = Number(this.form.value.ticketMedio) * Number(this.form.value.qtdMes)
    let vendaAnual = vendaMensal * 12
    let mediaSemanalVendedor = (Number(this.form.value.qtdMes) / qtdVendedores) / 4
    let mediaDiariaVendedor = mediaSemanalVendedor / 6
    //logica
    //console.log(Number(this.form.value.qtdMes)+Number(this.form.value.qtdMes));
    this.use.formData.push(this.form.value.qtdMes, this.form.value.qtdLojas, this.form.value.ticketMedio, this.form.value.qtdVendedoresLoja,qtdVendedores)
    this.use.resultados.push(vendaMensal, vendaAnual, mediaDiariaVendedor, mediaSemanalVendedor, 1)//1 = true
    this.router.navigate(['/projecao']);
    
    
  }

  

}
