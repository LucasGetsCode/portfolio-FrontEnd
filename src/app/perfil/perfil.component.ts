import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../common/auth.service'
import { ApiService } from '../common/api.service';
import { ManejarDatos } from '../home/manejarDatos';
import { MaxLengthValidator } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [AuthService, ApiService]
})
 


export class PerfilComponent implements OnInit {

  id: string = "";
  categoria: string = "perfil";
  info: string = "No se estaría cargando la base de datos o el backend. Disculpe las molestias";
  nombre: string = "Lucas Pujia";
  titulo: string = "Full stack developer Jr.";
  foto: string = "../assets/FotoPerfil.jpg";
  color: string = "";

  logged: boolean = true;
  editable: boolean = false;

  //datos: ManejarDatos = {'id': 0,'categoria':'perfil','titulo':'','fechaFin':'','fechaInicio':'', 'info':''};
  datos = {} as ManejarDatos

  constructor(private service: AuthService, private apiService: ApiService) { // Antes es necesario poner al servicio en providers
    this.logged = service.logIn;
    this.logged = true;
  }

  ngOnInit(): void {
    this.apiService.getDatos().subscribe((data: ManejarDatos[]) => {
      this.datos = data.filter(cosa => cosa.categoria == "perfil")[0];
      this.id = this.datos.id.toString();
      this.categoria = this.datos.categoria;
      this.info = this.datos.info;
      this.nombre = this.datos.titulo;
      this.titulo = this.datos.fechaInicio;
      this.foto = this.datos.fechaFin;
    });
  }

  onClickEdit(){
    //console.log("Click de " + this.titulo); /* Esto es una función local, funciona dentro del info.component */
    this.editable = !this.editable;
    if (!this.editable) {
      this.apiService.editarId(this.id, this.categoria, this.nombre, this.titulo, this.foto, this.info)
      console.log("Ha editado a " + this.titulo + " con éxito");
    } else {
      console.log("Ahora está editando " + this.titulo);
    }
  }

  cancelar() {
    this.editable = !this.editable;
  }

}