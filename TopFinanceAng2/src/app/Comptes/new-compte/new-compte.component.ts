import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompteService} from '../compte.service';
import {ClientService} from '../../Clients/client.service';
import {ApplicationService} from '../../Shared/application.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-compte',
  templateUrl: './new-compte.component.html',
  styleUrls: ['./new-compte.component.css']
})
export class NewCompteComponent implements OnInit {
  reactiveForm:FormGroup;
  f:FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  compteOperationnel;


  constructor(private compteService:CompteService, private clientService:ClientService,
              private applicationService:ApplicationService, private fb: FormBuilder,
              public router:Router,public toastr: ToastrService) {
    this.reactiveForm=this.fb.group(
      {code_compte:new FormControl('',[Validators.required])
        ,
        solde:new FormControl('')
        ,
        type_compte:new FormControl('',[Validators.required]),
        client:new FormControl(''),
        contact_beneficiaire:new FormControl('')
        ,
        beneficiaire:new FormControl('',[Validators.required]),
        compte_operationnel:new FormControl(''),
        commentaire:new FormControl('')
      }
    )
  }
  onItemChange(value){
    console.log(" Value is : ", value );
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
    this.onGetAllDivisions();
    this.mode = 'DEPART';
  }

  onGetAllComptes() {
    this.compteService.getAllCompte()
      .subscribe(data => {
        this.comptes = data;
      }, err => {
        console.log(err);
      })
  }


  onGetAllDivisions(){
    this.clientService.getAllCompte()
      .subscribe(data=>{
        this.divisions=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  /*
     onDeleteCompte(c) {

       let conf = confirm("Etes vous sur de vouloir supprimer ?");
       if (!conf) return;
       this.courrierDepService.deleteRessource(c)
         .subscribe(data => {
           this.onGetAllComptes();

         }, err => {
           console.log(err);
         })
     }
   */

  onNewCompte() {
    this.mode = 'new-cpte';
  }

  onRetourConsultation() {
    this.mode = 'list';
  }

  onSaveCompte(data) {

    //recuperation de url
    let url = this.applicationService.host + "/comptes";
    //Acces a la methode postRessource de Compte Service et envoie des données
    this.compteService.postRessource(url, data)
      .subscribe(data => {
        this.showSuccess();
        this.mode = 'new-cpte';
        this.onGetAllComptes();
        this.reactiveForm.reset();
        console.log(data)

      }, err => {
        console.log(err);
        console.log(data);
      })
  }

}
