import { Component, OnInit } from '@angular/core';
import { Simula } from '../shared/simula';
import { UseCash } from '../shared/useCash';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    console.log(this.form.value.qtdMes,qtdVendedores, mediaDiariaVendedor, mediaSemanalVendedor)


    this.use.formData.push(this.form.value.qtdMes, this.form.value.qtdLojas, this.form.value.ticketMedio, this.form.value.qtdVendedoresLoja, qtdVendedores)
    this.use.resultados.push(vendaMensal, vendaAnual, mediaDiariaVendedor, mediaSemanalVendedor, 1)
    /*
      Dados do formulário armazenados no use.formData
      Resultados atuais da empresa salvos no use.resultados, o 1 significa que o formulário foi aceito

      Criação das projeções de aumento com a useCash
    */
    let mediaDiaVendedor = 2
    let mediaSemanaVendedor = mediaDiaVendedor * 6
    let vendasMesUnidade = (mediaSemanaVendedor * qtdVendedores) * 4
    let vendasMes = vendasMesUnidade * Number(this.use.formData[2])
    let crescimento = (vendasMes / Number(this.use.resultados[0]) - 1)
    let crescimentoP = Math.round(crescimento * 100)
    let vendasAno = vendasMes * mediaSemanaVendedor


    this.use.projecao.push(vendasMes, mediaDiaVendedor, mediaSemanaVendedor, vendasMesUnidade, crescimentoP, vendasAno)
    console.log(this.use.projecao)

    //Cenário
   
    let vendaExtra = (vendasMes - Number(this.use.resultados[0]))
    let mensalidade = Number(this.use.precoPorLoja) * Number(this.use.formData[1])
    let lucroMensal = Number(vendaExtra) - mensalidade
    let lucroAnual = lucroMensal * 12
    let aumento = Number(this.use.projecao[3]) - Number(this.use.resultados[0])


    console.log(lucroAnual)
    this.use.melhorCenario.push(crescimentoP, vendaExtra, mensalidade, lucroMensal, lucroAnual, aumento)

    this.router.navigate(['/projecao']);

  }

}
