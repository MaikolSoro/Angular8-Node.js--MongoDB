import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  @Input() pelicula: Pelicula;
  @Output() MarcarFavorita = new  EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  
  //ESTE EVENTO LO QUE HACE ES PASAR DATOS MEDIANTE OUTPUT AL COMPONENTE PADRE
   seleccionar(event,pelicula){
    this.MarcarFavorita.emit({
      pelicula:pelicula
    });
   }
}
