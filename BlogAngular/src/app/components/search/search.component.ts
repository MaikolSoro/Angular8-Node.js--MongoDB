import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params} from '@angular/router';
import { Article }  from '../../models/article';
import { ArticleService} from '../../services/article.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[ArticleService] // inyecto el servicio
})
export class SearchComponent implements OnInit {

  public articles:Article[];
  public search :string;

  constructor(
    private _articleService: ArticleService,
    private _route:ActivatedRoute,
    private _router: Router
  ) {

   }

   // sacar el parametro de la url
  ngOnInit() {

    this._route.params.subscribe(params =>{
      var search = params['search'];
      this.search = search;
       // saco los articulos que estoy buscando
      this._articleService.search(search).subscribe(response=>{

        if(response.articles){
           this.articles = response.articles;
        }else{
          this.articles=[];
        }
      },
      error =>{
      console.log(error);
      this.articles=[];
      }
      ); 
    }
      )
  
  }

}
