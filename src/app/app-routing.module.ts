import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjecaoComponent } from './simulador/projecao/projecao.component';
import { FormularioComponent } from './simulador/formulario/formulario.component';

const routes: Routes = [
  { path: '', component: FormularioComponent },
  { path: 'projecao', component: ProjecaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
