import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Title} from "@angular/platform-browser";
import { AuthService } from '../common/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;

  username = '';
  /*email = '';*/
  password = '';

  username_min = 5;
  username_max = 16;

  password_min = 8;

  constructor (private authService: AuthService, private formBuilder: FormBuilder, private titleService: Title) {
    this.titleService.setTitle("Iniciar Sesión - Lucas Pujia");
    // Creamos el grupo de controles para el formulario de login
    this.form = this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(this.username_min), Validators.maxLength(this.username_max)]],
      password: ['',[Validators.required, Validators.minLength(8)]]/*,
      email: ['',[Validators.required, Validators.email]]*/
    })
  }

  public get Username(): any {
    return this.form.get("username");
  }

  public get Password(): any {
    return this.form.get("password");
  }

  /*public get mailGetter(): any {
    return this.form.value.email;
  }*/

  logged: boolean = false;

  onEnviar (event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault;
    this.logged = false;

    if (this.form.valid) {
      //console.log(this.form.value)
      alert("Todo salio bien ¡Enviar formuario!")
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.logged = true;
    } else {
      //console.log("Mal")
      console.log(this.form.value)
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template
      this.form.markAllAsTouched();
    }
  }

  Login() {
  // El servicio authService.login ya redirecciona
  // en caso de inicio de sesión positivo
    this.authService.login(this.username, this.password)
  }

  isLogged() {
    return this.logged;
  }

  ngOnInit() { }
}