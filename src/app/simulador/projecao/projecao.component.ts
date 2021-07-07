import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UseCash } from '../shared/useCash';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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


  constructor(
    private use: UseCash,
  ) {


    this.chartOptions = {
      series: [
        {
          data: [Number(this.use.resultados[0]), Number(this.use.projecao[0]),Number(this.use.melhorCenario[1]),]
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
          fontWeight: 'bold',
          fontSize: '16'
        },
        formatter: function (val, opt) {
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
            formatter: function () {
              return "";
            }
          }
        }
      },
    };

    this.chartOptions2 = {
      series: [
        {
          data: [Number(this.use.resultados[0])*12, Number(this.use.projecao[0])*12,Number(this.use.melhorCenario[1])*12]
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
          fontWeight: 'bold',
          fontSize: '16'
        },
        formatter: function (val, opt) {
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
            formatter: function () {
              return "";
            }
          }
        }
      },
    };

  }

  ngOnInit() {
    if (this.use.resultados[4] != 1) {
      this.voltar()
  }

  }

  voltar() {

    window.location.href = "/";
    //let piorCenario = Number(this.use.resultados[0])*5/100
    //this.use.piorCenario.push(piorCenario)
  }
  simulaCenarioPersonalizado(form: NgForm): void {

    if (form.form.value.CenarioPersonalizado) {
      var cresc = form.form.value.CenarioPersonalizado
    } else {
      cresc = 50;
    }
    let vendaExtra = (cresc / 100) * Number(this.use.resultados[0])
    let mensalidade = Number(this.use.precoPorLoja) * Number(this.use.formData[1])
    let lucroMensal = vendaExtra - mensalidade
    let lucroAnual = lucroMensal * 12

    this.use.cenarioPersonalizado.push(cresc, Math.round(vendaExtra), mensalidade, Math.round(lucroMensal), Math.round(lucroAnual))
    //window.location.reload()


  }

}
