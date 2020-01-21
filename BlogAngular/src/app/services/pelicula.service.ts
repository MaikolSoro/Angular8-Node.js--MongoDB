import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable()

export class PeliculaService{

    public peliculas:Pelicula[];
    constructor(){
        this.peliculas =[
            new Pelicula( "Superman 4",2019, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4bQgSMEvSVaYAa_KLHxbrYcjTxbiceaYp41_86iHZAPIZYJGm&s'),
            new Pelicula ( "Los vengadores Endgame",2018,"https://dam.smashmexico.com.mx/wp-content/uploads/2019/04/resena-avengers-endgame-sin-spoilers-mcu.jpg"),
            new Pelicula("Batman vs Superman 2",2015,"http://literalmagazine.com/assets/bversuss-620x350.jpeg")
 ];
    }
    holaMundo(){
        return 'Hola mundo desde un servicio de angular'
    }

    getPeliculas(){
       return  this.peliculas;
    }
}