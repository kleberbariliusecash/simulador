import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormularioComponent } from './simulador/formulario/formulario.component';
import { ProjecaoComponent } from './simulador/projecao/projecao.component';
import { NgApexchartsModule } from "ng-apexcharts";




@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    ProjecaoComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
