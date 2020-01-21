import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params} from '@angular/router';
import swal from 'sweetalert';

import {Article } from '../../models/article';
import {ArticleService } from '../../services/article.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers:[ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article:Article;
  public status:string;
  public page_title:string;

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
  this.page_title = 'Crear artículo';

  }

  ngOnInit() {
  }

  onSubmit(){
   this._articleService.create(this.article).subscribe( response=>{

    if(response.status == 'success'){
      this.status = 'success';
      this.article = response.article;

      // alerta
      swal(
          'Artículo creado!!',
          'El artículo se ha creado correctamente',
          'succes'
      );
      this._router.navigate(['/blog']);

    }else{
      this.status = 'error';
    }
   },
   error =>{
    console.log(error);
    this.status ='error';
   }
   );
  }

  imageUpload(data){ // data = datos
    let image_data =JSON.parse(data.response); // lo convertimos a json 
    this.article.image = image_data.image; // actualizo mi objeto articulo, lo que hago es que subir el arhivo y recoger el nombre del archivo para guardalo
  }
}
