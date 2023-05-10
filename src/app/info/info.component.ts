import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input () text: string = "";
  @Input () title: string = "Ramón";
  @Input () color: string = "";
  @Output () btnClick = new EventEmitter();


  contructor() {}

  ngOnInit(): void{
  }

  onClick(){
    console.log("Click de " + this.title); /* Esto es una función local, funciona dentro del info.component */
    this.btnClick.emit(); /* Esto es una función externa, llama a una función en otro componente, */
  }
}