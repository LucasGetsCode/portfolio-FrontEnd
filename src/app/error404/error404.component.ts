import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component {
	constructor(private titleService:Title) {
		this.titleService.setTitle("Error 404 - Página no encontrada");
	}
}
