import {Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article }  from '../models/article';
import { Global } from './global';
@Injectable()

export class ArticleService{

    public url:string;
    constructor(
        private _http: HttpClient
    ){
      this.url = Global.url;
    }

    pruebas(){
        return "Soy el servicio de articulos";
    }

     // va devolver observable para sacar los ultimos articulos
  getArticles(last:any= null):Observable<any>{
      var articles = 'articles';
      
    if(last !=null){
      var articles = 'articles/true';
    }
    return this._http.get(this.url+ articles);
  }

  getArticle(articleId):Observable<any>{
   
  return this._http.get(this.url+'article/' + articleId);
}

// servici0 de buscar
  search(searchString):Observable<any>{
    return this._http.get(this.url+'search/'+searchString);
}

// crear  el articulo
  create(article):Observable<any>{
    let params =JSON.stringify(article);
    let headers = new  HttpHeaders().set('Content-Type', 'application/json'); // defino las cabeceras

    return this._http.post(this.url+'save',params,{headers: headers}); // guardo el articulo en la api
  }

  // update del articulo

  update(id,article):Observable<any>{
     let params =JSON.stringify(article);
     let headers = new  HttpHeaders().set('Content-Type', 'application/json');

     return this._http.put(this.url+'article/'+ id,params,{headers: headers}); // actualizo el articulo en la api del backend
  }

  // servicio de eliminar un articulo
  delete(id):Observable<any>{

    let headers = new  HttpHeaders().set('Content-Type', 'application/json');

     return this._http.delete(this.url+'article/'+ id,{headers: headers}); // elimino el articulo en la api del backend
  }
}


