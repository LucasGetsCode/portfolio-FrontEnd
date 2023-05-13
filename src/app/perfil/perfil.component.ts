import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../common/auth.service'
import { ApiService } from '../common/api.service';
import { ManejarDatos } from '../home/manejarDatos';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [AuthService, ApiService]
})
 


export class PerfilComponent implements OnInit {

  @Input () id: string = "";
  @Input () categoria: string = "";
  @Input () text: string = "";
  @Input () titulo: string = "Ramón";
  @Input () fechaInicio: string = "";
  @Input () fechaFin: string = "";
  @Input () color: string = "";
  @Output () btnClickEdit = new EventEmitter(); /*Funciona como los anteriores, en el
  home.component se los pasa como argumentos y el parámetro es la función que llamará */
  @Output () btnClickDelete = new EventEmitter();

  logged: boolean = true;
  editable: boolean = false;
  borrar: boolean = false;

  users: ManejarDatos[] = [];

  constructor(private service: AuthService, private apiService: ApiService) { // Antes es necesario poner al servicio en providers
    this.logged = service.logIn;
    this.logged = true;
  }

  ngOnInit(): void {
  }

}