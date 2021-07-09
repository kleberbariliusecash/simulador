import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Simula } from '../shared/simula';
import { UseCash } from '../shared/useCash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  styleUrls: ['./formulario.component.css']
  
})


export class FormularioComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartQuarterOptions: Partial<ChartOptions>;

  form: FormGroup;
  graph: boolean = true
  grapha: boolean = false;
  @Input() proj: any;
  formValido: boolean = false;
  numberPattern = /^[0-9]*$/
  
  


  constructor(
    private formBuilder: FormBuilder,
    private use: UseCash,

  ) { 
   
  }
  

  ngOnInit() {
    this.createForm(new Simula());

  }

  createForm(simula: Simula) {
    
    this.form = this.formBuilder.group({
      /*
      qtdMes: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      qtdLojas: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      ticketMedio: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      qtdVendedoresLoja: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),*/
      qtdMes:3000,
      qtdLojas:10,
      ticketMedio:40,
      qtdVendedoresLoja:10
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
    //console.log(this.form.value.qtdMes,qtdVendedores, mediaDiariaVendedor, mediaSemanalVendedor)

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
    //console.log(this.use.projecao)

    //Cenário
   
    let vendaExtra = (vendasMes - Number(this.use.resultados[0]))
    let mensalidade = Number(this.use.precoPorLoja) * Number(this.use.formData[1])
    let lucroMensal = Number(vendaExtra) - mensalidade
    let lucroAnual = lucroMensal * 12
    let aumento = Number(this.use.projecao[3]) - Number(this.use.resultados[0])



    //console.log(lucroAnual)
    this.use.melhorCenario.push(crescimentoP, vendaExtra, mensalidade, lucroMensal, lucroAnual, aumento, mensalidade*12)
    //alert(this.use.melhorCenario[0])
  
    //this.form.reset()

  }
  aa(){
    this.grapha = true
    this.makeData()
    this.chartGraph()
  }

  chartGraph(){
    this.chartOptions = {
      series: [
        {
          name: "year",
          data: this.makeData()
        }
      ],
      chart: {
        id: "barYear",
        height: 400,
        width: "100%",
        type: "bar",
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
        formatter: function(val, opt) {
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
            formatter: function(val, opts) {
              return opts.w.globals.labels[opts.dataPointIndex];
            }
          }
        }
      },
      title: {
        text: "PROJEÇÃO MENSAL R$",
        offsetX: 15
      },
      yaxis: {
        labels: {
          show: false
        }
      }
    };
  
    
  }

   public makeData(): any {
    //alert(this.use.melhorCenario[1])
      if(this.use.melhorCenario[1]){
        
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
            x:"Aumento nas Vendas",
            y: Number(this.use.melhorCenario[1]),
            color: colors[2],
          },
        ];
    
        return dataYearSeries;
      }
      

    
    
    //var dataSet = this.shuffleArray(arrayData);
  
  }
  

  public shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  public updateQuarterChart(sourceChart, destChartIDToUpdate) {
    var series = [];
    var seriesIndex = 0;
    var colors = [];

    if (sourceChart.w.globals.selectedDataPoints[0]) {
      var selectedPoints = sourceChart.w.globals.selectedDataPoints;
      for (var i = 0; i < selectedPoints[seriesIndex].length; i++) {
        var selectedIndex = selectedPoints[seriesIndex][i];
        var yearSeries = sourceChart.w.config.series[seriesIndex];
        series.push({
          name: yearSeries.data[selectedIndex].x,
          data: yearSeries.data[selectedIndex].quarters
        });
        colors.push(yearSeries.data[selectedIndex].color);
      }

      if (series.length === 0)
        series = [
          {
            data: []
          }
        ];

      return window.ApexCharts.exec(destChartIDToUpdate, "updateOptions", {
        series: series,
        colors: colors,
        fill: {
          colors: colors
        }
      });
    }
  }

}
