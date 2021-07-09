import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UseCash } from '../shared/useCash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStates,
  ApexGrid,
  ApexTitleSubtitle
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};
var colors = [
  "#008FFB",
  "#00E396",
  "#FEB019",
  "#FF4560",
  "#775DD0",
  "#00D9E9",
  "#FF66C3"
];

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  subtitle: ApexTitleSubtitle;
  colors: string[];
  states: ApexStates;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  tooltip: any; //ApexTooltip;
};

declare global {
  interface Window {
    Apex: any;
  }
}

window.Apex = {
  chart: {
    toolbar: {
      show: false
    }
  },
  tooltip: {
    shared: false
  },
  legend: {
    show: false
  }
};

@Component({
  selector: 'sim-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [NgbCarouselConfig]

})

export class FormularioComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartQuarterOptions: Partial<ChartOptions>;
  form: FormGroup;

  tipoGrafico: any
  graphView: boolean = false;
  @Input() proj: any;
  formValido: boolean = false;
  numberPattern = /^[0-9]*$/

  constructor(
    private formBuilder: FormBuilder,
    private use: UseCash,
  ) {

  }

  ngOnInit() {
    this.createForm();

  }

  createForm() {

    this.form = this.formBuilder.group({
      
      qtdMes: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      qtdLojas: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      ticketMedio: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      qtdVendedoresLoja: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      /*qtdMes: 3000,
      qtdLojas: 10,
      ticketMedio: 40,
      qtdVendedoresLoja: 10
      */
    })
  }
  onSubmit() {

    this.use.melhorCenario = [];
    this.use.cenarioPersonalizado = [];
    this.use.formData = [];
    this.use.projecao = [];
    this.use.resultados = [];

    let qtdVendedores = this.form.value.qtdLojas * this.form.value.qtdVendedoresLoja
    let vendaMensal = Number(this.form.value.ticketMedio) * Number(this.form.value.qtdMes)
    let vendaAnual = vendaMensal * 12
    let mediaSemanalVendedor = (Number(this.form.value.qtdMes) / qtdVendedores) / 4
    let mediaDiariaVendedor = mediaSemanalVendedor / 6

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

    this.use.projecao.push(vendasMes, mediaDiaVendedor, mediaSemanaVendedor, vendasMesUnidade, crescimentoP, vendasAno);
    //Cenário

    let vendaExtra = (vendasMes - Number(this.use.resultados[0]))
    let mensalidade = Number(this.use.precoPorLoja) * Number(this.use.formData[1])
    let lucroMensal = Number(vendaExtra) - mensalidade
    let lucroAnual = lucroMensal * 12
    let aumento = Number(this.use.projecao[3]) - Number(this.use.resultados[0])
    this.use.melhorCenario.push(crescimentoP, vendaExtra, mensalidade, lucroMensal, lucroAnual, aumento, mensalidade * 12);
  }

  graficoValido(tipo) {
    this.tipoGrafico = this.makeData2()

    if (tipo != 1) {
      this.tipoGrafico = this.makeData()
    }
    this.graphView = true

    this.chartGraph()
  }

  chartGraph() {
    this.chartOptions = {
      series: [
        {
          name: "vendas",
          data: this.tipoGrafico
        }
      ],
      chart: {
        id: "projecao-mensal",
        height: 400,
        width: "100%",
        type: "bar",
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            customIcons: []
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString()
              }
            },

          },
          autoSelected: 'zoom'
        },
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: true,
          barHeight: "85%",
          dataLabels: {
            position: "bottom"
          }
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex];
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },

      colors: colors,

      states: {
        normal: {
          filter: {
            type: "desaturate"
          }
        },
        active: {
          allowMultipleDataPointsSelection: true,
          filter: {
            type: "darken",
            value: 1
          }
        }
      },

      tooltip: {
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (val, opts) {
              return opts.w.globals.labels[opts.dataPointIndex];
            }
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return `R$${value},00`;
          },
          show: false,
        },
      },
    };


  }

  public makeData(): any {
    if (this.use.melhorCenario[1]) {

      var dataYearSeries = [
        {
          x: "Venda Mensal Atual",
          y: Number(this.use.resultados[0]),
          color: colors[0],
        },
        {
          x: "Venda Mensal com a UseCash",
          y: Number(this.use.projecao[0]),
          color: colors[1],
        },
        {
          x: "Aumento nas Vendas",
          y: Number(this.use.melhorCenario[1]),
          color: colors[2],
        },
      ];

      return dataYearSeries;
    }
  }
  public makeData2(): any {
    if (this.use.melhorCenario[1]) {

      var dataYearSeries = [
        {
          x: "Venda Anual Atual",
          y: Number(this.use.resultados[0]) * 12,
          color: colors[0],
        },
        {
          x: "Venda Anual com a UseCash",
          y: Number(this.use.projecao[0]) * 12,
          color: colors[1],
        },
        {
          x: "Aumento nas Vendas",
          y: Number(this.use.melhorCenario[1]) * 12,
          color: colors[2],
        },
      ];

      return dataYearSeries;
    }
  }
}
