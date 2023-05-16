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

    proyectos: ManejarDatos[] = []; // PROYECTOS;

    habilidades: ManejarDatos[] = []; // HABILIDADES;


    banner: ManejarDatos = <ManejarDatos>{};

    logged: boolean = true;

    creando: boolean = false;
    editable: boolean = false;

    /*constructor(private http: HttpClient) {
      http.get('personas/traer').subscribe(data => this.greeting = data);
    }*/

    constructor(private service: AuthService, private apiService: ApiService) {
      this.logged = service.logIn;
      //this.logged = true;
    }

    datos: ManejarDatos[] = [];

    ngOnInit(): void {
      this.apiService.getDatos().subscribe((data: ManejarDatos[]) => {
        //console.log(data);
        this.datos = data;
        this.experiencia = this.datos.filter(cosa => cosa.categoria == "experiencia");
        this.educacion = this.datos.filter(cosa => cosa.categoria == "educacion");
        this.proyectos = this.datos.filter(cosa => cosa.categoria == "proyectos");
        this.habilidades = this.datos.filter(cosa => cosa.categoria == "habilidades");
        this.banner = this.datos.filter(cosa => cosa.categoria == "banner")[0];
      });
    }

    editar(): void{
      this.editable = !this.editable;
      if (!this.editable) {
        console.log("Ha editado el banner con éxito");
        this.apiService.editarId(this.banner.id.toString(), this.banner.categoria, this.banner.titulo, "", "", "")
      } else {
        console.log("Ahora está editando el banner");
      }
    }

    eliminar(id: number): void{
      //console.log("Has eliminado con éxito" + id);
      console.log(this.datos)
      console.log(id)
      this.datos = this.datos.filter(post => post.id != id);
      this.apiService.eliminarId(id).subscribe();
      this.actualizarDatos();
    }

    actualizarDatos(): void {
      this.experiencia = this.datos.filter(post => post.categoria == "experiencia");
      this.educacion = this.datos.filter(post => post.categoria == "educacion");
      this.proyectos = this.datos.filter(post => post.categoria == "proyectos")
      this.habilidades = this.datos.filter(cosa => cosa.categoria == "habilidades");
    }

    agregar(categoria: string): void{
      this.creando = true;
      console.log("Hola, estás en " + categoria)
      const nuevoPost = {'id':0,'categoria':categoria, 'titulo':'Título', 'fechaInicio':'Fecha de inicio', 'fechaFin': 'Fecha de finalización', 'info':'Información adicional'}
      this.apiService.agregarPost(nuevoPost).subscribe((id: Number) => {
        console.log("Dentro del agregar post:")
        console.log("Viejo post.id: " + nuevoPost.id)
        nuevoPost.id = Number(id)
        console.log("Actualizado: " + nuevoPost.id)
        this.datos.push(nuevoPost)
        this.actualizarDatos()
        console.log(this.datos)
        this.creando = false;
      })
      
    }

    buscar(id: number) {
      this.apiService.buscarId(id).subscribe((post: ManejarDatos[]) => console.log(post))
    }
}
