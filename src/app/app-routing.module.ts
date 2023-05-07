import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404Component } from "./error404/error404.component"
import { LoginComponent } from "./login/login.component";
import { PerfilComponent } from "./perfil/perfil.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  /*{path: "home", component: HomeComponent},*/
  {path: "perfil", component: PerfilComponent,/*canActivate: [AuthGuard],*/},
  {path: "", redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: Error404Component, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot (routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }