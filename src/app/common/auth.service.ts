import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  uri = 'http://localhost:8080'; // La Url que corresponda en cada caso
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJMdWNhc1B1amlhIiwiaWF0IjoxNTE2MjM5MDIyfQ.wdZam60XGr4DXhCl5783OzzaTrekKp6-iuWHBMfGt28";

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    if (username == "LucasPujia" && password=="aniLogin1") {

          console.log("Login correcto, redirigiendo")

          this.router.navigate(['home']);
        // Guardamos el token en localStorage
          localStorage.setItem( 'token', this.token);
          
          alert("Login correcto, redirigiendo")
          
    } else {

      console.log("Los datos ingresados son incorrectos")
      alert("Los datos ingresados son incorrectos")

    }
  }

  // Para cerrar sesión elinimamos el token del localStorate logout() {
  logout(): void {
    localStorage.removeItem('token');
  }
  
  // Un servicio para verificar si existe la sesión public get logIn(): boolean {
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

}

/*export class AuthService {
  uri = 'http://localhost:8080'; // La Url que corresponda en cada caso
  token: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    this.http.post(this.uri + '/authenticate', {email: email, password: password}) 
      .subscribe((resp: any) => {
      //Redireccionamos al usuario a su perfil
          this.router.navigate(['home']);
        // Guardamos el token en localStorage
          localStorage.setItem( 'auth_token', resp.token);
      }
    );
  }

  // Para cerrar sesión elinimamos el token del localStorate logout() {
  logout() {
    localStorage.removeItem( 'token');
  }
  
  // Un servicio para verificar si existe la sesión public get logIn(): boolean {
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
*/