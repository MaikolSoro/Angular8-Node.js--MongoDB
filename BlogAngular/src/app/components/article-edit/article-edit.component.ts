import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params} from '@angular/router';
import swal from 'sweetalert';
import {Article } from '../../models/article';
import {ArticleService } from '../../services/article.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers:[ArticleService]
})
export class ArticleEditComponent implements OnInit {

  public article:Article;
  public status:string;
  public is_edit:boolean;
  public page_title:string;
  public  url:string;

  afuConfig = {
    multiple: false, // si me permite subir multiples de archivos
    formatsAllowed: ".jpg,.png, .gif, .jpeg", // formato permitidos
    maxSize: "1",// tamaño maximo del archivo
    uploadAPI:  {
      url: Global.url+'upload-image', // url de mi api
    },
    theme: "attachPin", // tema
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false, // el boton para seleccionar
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube la imagen del articulo...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
};


  constructor(

    private _articleService: ArticleService,
    private _route:ActivatedRoute,
    private _router: Router
  ) { 
  this.article = new Article('','','',null,null);
  this.is_edit = true;
  this.page_title = 'Editar artículo';
  this.url= Global.url;
  }

  ngOnInit() {
    this.getArticle();
  }

  onSubmit(){
    this._articleService.update(this.article._id,this.article).subscribe( response=>{
 
     if(response.status == 'success'){
       this.status = 'success';
       this.article = response.article;

        // alerta
      swal(
        'Artículo editado!!',
        'El artículo se ha modificado correctamente',
        'succes'
    );

       this._router.navigate(['/blog/articulo',this.article._id]);
 
     }else{
       this.status = 'error';
     }
    },
    error =>{
     console.log(error);
     this.status ='error';

     swal(
      'Edición fallida!!',
      'El artículo no se ha modificado correctamente',
      'error'
  );
    }
    );
   }
 
   imageUpload(data){ // data = datos
     let image_data =JSON.parse(data.response); // lo convertimos a json 
     this.article.image = image_data.image; // actualizo mi objeto articulo, lo que hago es que subir el arhivo y recoger el nombre del archivo para guardalo
   }

   // Traigo los datos de la base de datos
   getArticle(){
    this._route.params.subscribe(params =>{
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
       
       response =>{
        if(response.article){
          this.article =response.article;
        }else{
          this._router.navigate(['/home']);
        }
       },
       error=>{
         console.log(error);
       }
       );
   });
   }

}
