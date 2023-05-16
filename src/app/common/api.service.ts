import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManejarDatos } from '../home/manejarDatos';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private baseUrl = "http://localhost:8080";
  private baseUrl = "https://springboot3-u4hn.onrender.com";
  constructor(private http: HttpClient) { }

  getDatos(): Observable<ManejarDatos[]>{
    return this.http.get<ManejarDatos[]>(this.baseUrl + "/datos/traer");
  }

  getUltimoDato(): Observable<ManejarDatos>{
    return this.http.get<ManejarDatos>(this.baseUrl + "/datos/traer/ultimo");
  }

  eliminarId(id: number): Observable<Object>{
    console.log("Hola");
    return this.http.delete<Object>(this.baseUrl + "/datos/borrar/" + id);
  }

  agregarPost(datos: ManejarDatos): Observable<Number> {
    console.log("Se ha agregado el post con éxito");
    return this.http.post<Number>(this.baseUrl + "/datos/crear", datos);    
  }

  buscarId(id: number): Observable<ManejarDatos[]> {
    return this.http.get<ManejarDatos[]>(this.baseUrl + "/datos/buscar/" + id);
  }

  editarId(id: string, categoria: String, titulo: String, fechaInicio: String, fechaFin: String, info: String) {
    console.log(`{'categoria':'${categoria}', 'titulo':'${titulo}', 'fechaInicio':'${fechaInicio}','fechaFin':'${fechaFin}', 'info':'${info}'}`)
    const body = {categoria:categoria, titulo:titulo, fechaInicio:fechaInicio, fechaFin: fechaFin, info:info}
    return this.http.put<any>(this.baseUrl + "/datos/editar/" + id, body).subscribe();
  }
}