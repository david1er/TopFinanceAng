import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompteService} from '../compte.service';
import {ClientService} from '../../Clients/client.service';
import {ApplicationService} from '../../Shared/application.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-compte',
  templateUrl: './edit-compte.component.html',
  styleUrls: ['./edit-compte.component.css']
})
export class EditCompteComponent implements OnInit {
  reactiveForm:FormGroup;
  f:FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  id;


  constructor(private compteService:CompteService, private clientService:ClientService,
              private applicationService:ApplicationService, private fb: FormBuilder,
              public router:Router,public toastr: ToastrService,public activatedRoute:ActivatedRoute) {
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
    this.id= activatedRoute.snapshot.params['id'];
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

  ngOnInit() {
    this.onGetAllComptes();
    this.onGetAllDivisions();
    this.onGetOneCompte(this.id);
  }

  onGetAllComptes() {
    this.compteService.getAllCompte()
      .subscribe(data => {
        this.comptes = data;
      }, err => {
        console.log(err);
      })
  }

  onGetOneCompte(c) {
    this.compteService.getOneCompte(c)
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

  onSaveCompte(data) {

    //recuperation de url
    let url = this.applicationService.host + "/comptes";
    //Acces a la methode postRessource de Compte Service et envoie des données
    this.compteService.postRessource(url, data)
      .subscribe(data => {
        this.showSuccess();
        this.onGetAllComptes();
        this.reactiveForm.reset();
        console.log(data)

      }, err => {
        console.log(err);
        console.log(data);
      })
  }

}
