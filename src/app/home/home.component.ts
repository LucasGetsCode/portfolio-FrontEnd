import { Component, OnInit, importProvidersFrom } from '@angular/core';
//import {EXPERIENCIA, EDUCACION, PROYECTOS} from "./datos";
import { ManejarDatos } from './manejarDatos';
import { ApiService } from '../common/api.service';
import { AuthService } from '../common/auth.service';

//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  

    experiencia: ManejarDatos[] = []; // EXPERIENCIA;

    educacion: ManejarDatos[] = []; // EDUCACION;

    proyectos: ManejarDatos[] = []; //PROYECTOS;

    logged: boolean = true;

    /*constructor(private http: HttpClient) {
      http.get('personas/traer').subscribe(data => this.greeting = data);
    }*/

    constructor(private service: AuthService, private apiService: ApiService) {
      this.logged = service.logIn;
      this.logged = true;
    }

    datos: ManejarDatos[] = [];

    ngOnInit(): void {
      this.apiService.getDatos().subscribe((data: ManejarDatos[]) => {
        //console.log(data);
        this.datos = data;
        this.experiencia = this.datos.filter(cosa => cosa.categoria == "experiencia");
        this.educacion = this.datos.filter(cosa => cosa.categoria == "educacion");
        this.proyectos = this.datos.filter(cosa => cosa.categoria == "proyectos");
      });
    }

    

    editar(){
      console.log("Estás editando con éxito");
    }

    eliminar(id: number): void{
      //console.log("Has eliminado con éxito" + id);
      this.apiService.eliminarId(id).subscribe();
    }

    actualizarDatos(): void {
      this.experiencia = this.datos.filter(cosa => cosa.categoria == "experiencia");
      this.educacion = this.datos.filter(cosa => cosa.categoria == "educacion");
      this.proyectos = this.datos.filter(cosa => cosa.categoria == "proyectos")
    }

    agregar(categoria: string): void{
      console.log("Hola, estás en " + categoria)
      const nuevoPost = {'id':0,'categoria':categoria, 'titulo':'Título', 'fechaInicio':'Fecha de inicio', 'fechaFin': 'Fecha de finalización', 'info':'Información adicional'}
      this.datos.push(nuevoPost)
      this.apiService.agregarPost(nuevoPost).subscribe()
      this.actualizarDatos()
      console.log(this.datos)
    }

    buscar(id: number) {
      this.apiService.buscarId(id).subscribe((post: ManejarDatos[]) => console.log(post))
    }
}
