import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../common/auth.service'
import { ApiService } from '../common/api.service';
import { ManejarDatos } from '../home/manejarDatos';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [AuthService, ApiService]
})

export class InfoComponent implements OnInit {

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

  onClickEdit(){
    //console.log("Click de " + this.titulo); /* Esto es una función local, funciona dentro del info.component */
    this.editable = !this.editable;
    if (!this.editable) {
      this.btnClickEdit.emit("hola"); /* Esto es una función externa, llama a una función en otro componente, */
      console.log("Ha editado a " + this.titulo);
      this.apiService.editarId(this.id, this.categoria, this.titulo, this.fechaInicio, this.fechaFin, this.text)
    } else {
      console.log("Ahora está editando " + this.titulo);
    }
    console.log(this.fechaInicio);
  }

  onClickDelete(){
    this.borrar = !this.borrar;
    if (!this.borrar) {
      console.log(this.titulo + " ha sido eliminado."); /* Esto es una función local, funciona dentro del info.component */
      this.btnClickDelete.emit("id"); /* Esto es una función externa, llama a una función en otro componente, */
    } else {
      console.log("Quieres eliminar a "+ this.titulo + "?");
    }
  }
}