import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManejarDatos } from '../home/manejarDatos';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getDatos(): Observable<ManejarDatos[]>{
    return this.http.get<ManejarDatos[]>(this.baseUrl + "/datos/traer");
  }

  eliminarId(id: number): Observable<Object>{
    console.log("Hola");
    return this.http.delete(this.baseUrl + "/datos/borrar/" + id);
  }

  agregarPost(datos: ManejarDatos): Observable<Object> {
    console.log("Se ha agregado el post con éxito");
    return this.http.post<Object>(this.baseUrl + "/datos/crear", datos);    
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