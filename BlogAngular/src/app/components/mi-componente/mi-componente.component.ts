import {Component } from '@angular/core';

@Component({
    selector: 'mi-componente',
    templateUrl: './mi-componente.component.html'  
              
})

export class MiComponente{

    public titulo: string;
    public comentario: string;
    public year: number;
    public mostarPeliculas:boolean;

    constructor(){
        this.titulo = "Hola mundo";
        this.comentario = "Este es mi primer componente";
        this.year = 2020;
        this.mostarPeliculas = true;

        console.log("Componente a cargado bien");
    }

    ocultarPeliculas(){
        this.mostarPeliculas = false;
    }
}