import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../client.service';
import {ApplicationService} from '../../Shared/application.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  reactiveForm:FormGroup;
  f:FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  currentCompte;
  progress: number;


  constructor(private clientService:ClientService,private applicationService:ApplicationService, private fb: FormBuilder, public router:Router,public toastr: ToastrService) {
    this.reactiveForm=this.fb.group(
      {nom_client:new FormControl('',[Validators.required])
        ,
        email_client:new FormControl('')
        ,
        sexe_client:new FormControl('',[Validators.required]),
        profession:new FormControl('',[Validators.required]),
        date_nais:new FormControl('',[Validators.required]),
        telephone:new FormControl('',[Validators.minLength(1)]),
        numero_cni:new FormControl(''),
        //signature:new FormControl(''),
        quartier:new FormControl(''),
        photo:new FormControl('')
      }
    )
  }

//Pour la notification
  showSuccess(){
    this.applicationService.showSuccess();
  }
  errorSuccess(){
    this.applicationService.errorSuccess();
  }

  comptes;
  divisions;
  conf;
  mode = 'new-cpte';

  ngOnInit() {
    this.onGetAllComptes();
    // this.onGetAllDivisions();
    this.mode = 'DEPART';
  }

  onGetAllComptes() {
    this.clientService.getAllCompte()
      .subscribe(data => {
        this.comptes = data;
      }, err => {
        console.log(err);
      })
  }

  onNewCompte() {
    this.mode = 'new-cpte';
  }

  onRetourConsultation() {
    this.mode = 'list';
  }

  onSaveCompte1(data) {
    //recuperation de url
    let url = this.applicationService.host + "/clients";
    //Acces a la methode postRessource de Compte Service et envoie des données
    this.clientService.postRessource(url, data)
      .subscribe(data => {
        this.showSuccess();
        this.mode = 'new-cpte';
        this.onGetAllComptes();
        this.reactiveForm.reset();

      }, err => {
        console.log(err);
      })
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    const file=event.target.files[0];

  }

  onSaveCompte2(data) {

    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(data);
    this.clientService.pushFileToStorage(this.currentFileUpload, data)
      .subscribe((response) => {
          console.log(response);
          this.showSuccess();
        }
        ,err=>{
          console.log(err);
          this.errorSuccess();
        });
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  onSaveCompte(data) {

    if (data.photo!=""){
      this.progress = 0;
      this.currentFileUpload = this.selectedFiles.item(0);
      console.log(data.photo);

      this.clientService.pushFileToStorage(this.currentFileUpload, data).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.applicationService.showSuccess();
        }
      },err=>{
        this.toastr.error(err.error.message, 'Top Finance!');
      })
      this.selectedFiles = undefined

    }else if (data.photo==""){
        //recuperation de url
        let url = this.applicationService.host + "/clients/noPhoto";
      this.clientService.postClients(url,data)
        .subscribe(data => {
         // this.onGetAllComptes();
          this.applicationService.showSuccess();
         // alert("Opération éffectué avec succès");

        }, err => {
          console.log(err);
        })
    }



  }
  /*
    selectFile(event) {
      this.selectedFiles = event.target.files;
      const file=event.target.files[0];

    }

    upload(data) {

      this.currentFileUpload = this.selectedFiles.item(0);
      console.log(data);
      this.courrierDepService.pushFileToStorage(this.currentFileUpload, data)
        .subscribe((response) => {
            console.log(response);
            this.showSuccess();

          }
          ,err=>{
            console.log(err);
            this.errorSuccess();
          });
    }*/



  /*  onEditCompte(c, data) {
      this.courrierDepService.getRessource(this.courrierDepService.host + "/courrier/" + c)
        .subscribe(data => {
          this.currentCompte = data;
          this.mode = 'edit-cpte'

        }, err => {
          console.log(err);
        })
    }*/

  /*onSaveDestinataire(data){
    //recuperation de url
    let url = this.destinateurService.host + "/destinataire";
    //Acces a la methode postRessource de Compte Service et envoie des données
    this.destinateurService.postRessource(url, data)
      .subscribe(data => {
        this.showSuccess();
        // this.mode = 'new-cpte';
        this.onGetAllComptes();
        this.onGetAllDivisions();
        this.f.reset();

      }, err => {
        console.log(err);
      })
  }*/
}
