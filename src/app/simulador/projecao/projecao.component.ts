import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UseCash } from '../shared/useCash';
import { NgForm } from '@angular/forms';

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
  selector: 'sim-projecao',
  templateUrl: './projecao.component.html',
  styleUrls: ['./projecao.component.css']
})
export class ProjecaoComponent implements OnInit {

 
  @ViewChild("chart2") chart: ChartComponent;
  public chartOptions2: Partial<ChartOptions>;
  public chartQuarterOptions2: Partial<ChartOptions>;
  jumb: boolean = false;
  valeContratar: boolean = true;
  index: Number = 0

  constructor(
    private use: UseCash,
  ) {


   
  }

  ngOnInit() {
    

  }

  simulaCenarioPersonalizado(form: NgForm): void {
    setTimeout(function () {
      window.scrollTo(0, document.body.scrollHeight);
  },2);
  
    this.use.cenarioPersonalizado = [];
    this.jumb = true
    
   
    

    if (form.form.value.CenarioPersonalizado) {
      var cresc = form.form.value.CenarioPersonalizado
    } else {
      cresc = 50;
    }
    let vendaExtra = (cresc / 100) * Number(this.use.resultados[0])
    let mensalidade = Number(this.use.precoPorLoja) * Number(this.use.formData[1])
    let lucroMensal = vendaExtra - mensalidade
    let lucroAnual = lucroMensal * 12
    if (lucroAnual < 0){
      this.valeContratar = false;
    }else{
      this.valeContratar = true;
    } 

    this.use.cenarioPersonalizado.push(cresc, Math.round(vendaExtra), mensalidade, Math.round(lucroMensal), Math.round(lucroAnual), mensalidade*12)
   

  }

}
