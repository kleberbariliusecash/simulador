import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UseCash } from '../shared/useCash';
import { Teste } from './teste.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Chart } from 'chart.js';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};




@Component({
  selector: 'sim-projecao',
  templateUrl: './projecao.component.html',
  styleUrls: ['./projecao.component.css']
})
export class ProjecaoComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild("chart2") chart2: ChartComponent;
  public chartOptions2: Partial<ChartOptions>;

  title = 'Ng7ChartJs By DotNet Techy';
  LineChart = [];
  BarChart = [];
  PieChart = [];

  @Input() t: Teste

  constructor(

    private use: UseCash,
    private route: ActivatedRoute,
    private router: Router
  ) {

    
    this.chartOptions = {
      series: [
        {
          data: [120000,192000,72000]
        }
      ],
      chart: {
        type: "bar",
        height: 380
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom",
          }
        }
      },
      colors: [
        "#fa3737",
        "#07e36a",
        "#d1e307"
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["black"],
          fontWeight:'bold',
          fontSize:'16'
        },
        formatter: function(val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
      },
      stroke: {
        width: 1,
        colors: ["black"]
      },
      xaxis: {
        categories: [
          "Vendas Mensais Atuais R$",
          "Vendas Mensais - useCash R$",
          "Aumento de Vendas R$",
          
         
        ]
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        text: "Acompanhe como será sua evolução Mensal nas Vendas",
        align: "center",
        floating: true
      },
      subtitle: {
        text: "Todos os números equivalem são em Reais",
        align: "center"
      },
      tooltip: {
        theme: "dark",
        x: {
          show: true
        },
        y: {
          title: {
            formatter: function() {
              return "";
            }
          }
        }
      },
    };
     
    this.chartOptions2 = {
      series: [
        {
          data: [1440000,2304000,864000]
        }
      ],
      chart: {
        type: "bar",
        height: 380
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom",
          }
        }
      },
      colors: [
        "#fa3737",
        "#07e36a",
        "#d1e307"
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["black"],
          fontWeight:'bold',
          fontSize:'16'
        },
        formatter: function(val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          
          
        
          
        }
      },
      stroke: {
        width: 1,
        colors: ["black"]
      },
      xaxis: {
        categories: [
          "Vendas Anuais R$",
          "Vendas Anuais - useCash R$",
          "Aumento de Vendas R$",
          
         
        ]
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        text: "Acompanhe como será sua evolução Anual nas Vendas",
        align: "center",
        floating: true
      },
      subtitle: {
        text: "Todos os números equivalem a reais",
        align: "center"
      },
      tooltip: {
        theme: "dark",
        x: {
          show: true
        },
        y: {
          title: {
            formatter: function() {
              return "";
            }
          }
        }
      },
    };
  
  


  }

  ngOnInit() {
    
    this.projecao()



  }


  projecao() {
    //alert(this.ra.resultados[4])
    if (this.use.resultados[4] === 1) {

      let qtdVendedores = Number(this.use.formData[4])

      //Projeção

      let mediaDiaVendedor = 2 //@input
      let mediaSemanaVendedor = mediaDiaVendedor * 6
      let vendasMesUnidade = (mediaSemanaVendedor * qtdVendedores) * 4
      let vendasMes = vendasMesUnidade * Number(this.use.formData[2])
      let crescimento = (vendasMes / Number(this.use.resultados[0]) - 1)
      let crescimentoP = Math.round(crescimento * 100)
      //alert(Number(this.ra.formData[0]) + Number(this.ra.formData[0]))
      //alert(Math.round(crescimento*100)+'%')
      let vendasAno = vendasMes * mediaSemanaVendedor

      this.use.projecao.push(mediaDiaVendedor, mediaSemanaVendedor, vendasMesUnidade, vendasMes, crescimentoP, vendasAno)
      console.log(this.use.projecao)

      //Cenário
      let vendaExtra = vendasMes - Number(this.use.resultados[0])
      let mensalidade = Number(this.use.precoPorLoja) * Number(this.use.formData[1])
      let lucroMensal = vendaExtra - mensalidade
      let lucroAnual = lucroMensal * 12


      console.log(lucroAnual)
      this.use.melhorCenario.push(crescimentoP, vendaExtra, mensalidade, lucroMensal, lucroAnual)


    } else {
      //alert("cauy aaq")
    }


  }

  teste() {
    alert(this.use.resultados[4])///testar caso estiver ativo
  }

  voltar() {

      window.location.href="/";
    //let piorCenario = Number(this.use.resultados[0])*5/100
    //this.use.piorCenario.push(piorCenario)
  }
  simulaPiorCenario(form: NgForm): void {



    if (form.form.value.crescimentoPiorCenario) {
      var cresc = form.form.value.crescimentoPiorCenario
    } else {
      cresc = 50;
    }
    let vendaExtra = (cresc / 100) * Number(this.use.resultados[0])
    let mensalidade = Number(this.use.precoPorLoja) * Number(this.use.formData[1])
    let lucroMensal = vendaExtra - mensalidade
    let lucroAnual = lucroMensal * 12

    this.use.piorCenario.push(cresc, vendaExtra, mensalidade, lucroMensal, lucroAnual)
    //window.location.reload()




  }

}
