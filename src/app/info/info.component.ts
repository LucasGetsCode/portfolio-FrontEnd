import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input () text: string = "";
  @Input () title: string = "Ramón";
  @Input () color: string = "";


  contructor() {}

  ngOnInit(): void{
  }

  onClick(){
    console.log("Click de " + this.title)
  }
}