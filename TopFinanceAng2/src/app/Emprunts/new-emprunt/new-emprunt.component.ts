import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompteService} from "../../Comptes/compte.service";
import {ClientService} from "../../Clients/client.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EmpruntService} from "../emprunt.service";
import {ApplicationService} from '../../Shared/application.service';

@Component({
  selector: 'app-new-emprunt',
  templateUrl: './new-emprunt.component.html',
  styleUrls: ['./new-emprunt.component.css']
})
export class NewEmpruntComponent implements OnInit {
  reactiveForm:FormGroup;
  f:FormGroup;
  comptes;
  divisions;
  conf;
  mode = 'new';
  frais_dossier;
  montant_total;
  interet_mensuel;
  interet_total;
  num_compte;
  date=new Date();
  telephone;
  date_effet;
  date_debut_remb: Date;
  capital;
  mensualite;
  nombre_echeance;
  dd;
  donnees;
  date1: Date;
  remboursements:Object;


  constructor(private empruntService:EmpruntService, private compteService:CompteService,
              private applicationService:ApplicationService, private fb: FormBuilder,
              public router:Router,public toastr: ToastrService) {
    this.reactiveForm=this.fb.group(
      {capital:new FormControl('',[Validators.required])
        ,
        nombre_echeance:new FormControl('',[Validators.required])
        ,
        taux_interet_annuel:new FormControl('',[Validators.required]),
        taux_frais_dossier:new FormControl('',[Validators.required]),
        date_effet_pret:new FormControl('',[Validators.required])
        ,
        date_debut_remboursement:new FormControl('',[Validators.required]),
        num_cpte:new FormControl('',[Validators.required])
      }
    )
  }


  //Pour la notification
  showSuccess(){
    this.applicationService.showSuccess();
  }
  errorSuccess(){
    this.applicationService.errorSuccess();
    this.mode='new';
  }


  ngOnInit() {
    this.onGetAllComptes();
    this.date1 = new Date();
    this.date1.setDate( this.date1.getDate() + 5 );
    console.log(this.date1);
  }

  onCalculer(data) {
    this.frais_dossier=((data.capital*data.taux_frais_dossier)/100);
    this.interet_mensuel=((data.capital*data.taux_interet_annuel)/100);
    this.interet_total=this.interet_mensuel*data.nombre_echeance;
    this.montant_total=((+data.capital)+(+this.interet_total));
    this.mensualite=((this.montant_total)/(data.nombre_echeance));
    //recuperation des données
    this.num_compte=data.num_cpte;
    this.capital=data.capital;
    this.date_effet=data.date_effet_pret;
    this.date_debut_remb=data.date_debut_remboursement;
    this.nombre_echeance=data.nombre_echeance;
    this.donnees=data;
    this.donnees.frais_dossier=this.frais_dossier;
    this.donnees.compte=this.comptes.code_compte;
    this.donnees.interet=this.interet_total;
    this.donnees.mensualite=this.mensualite;
    this.donnees.montant_total=this.montant_total;
    this.donnees.reste=this.montant_total;

    this.onGetCompte();
    //this.mode='consult';

    this.date_debut_remb=(new Date((this.date_debut_remb)));
    for (let index = 0; index < 10; index++) {
      console.log(index);
      this.date_debut_remb.setDate( this.date_debut_remb.getDate() + 5 );
      this.comptes=
        console.log(this.date_debut_remb);
    }

  }

  onGetCompte() {
    this.comptes=null;
    //do{
    this.compteService.getOneCompte(this.num_compte)
      .subscribe(data => {
        this.comptes = data;
        //Verifier l'etat du Compte

        if(this.comptes.type_compte!='Compte Emprunt'){
          this.toastr.warning("Veuillez saisir un numéro de Compte Emprunt", 'Top Finance!');
        }else {

          //Opération meme
          this.mode = 'consult';
        }

      }, err => {
        console.log(err);
        this.toastr.warning(err.error.message,'Top Finance');
        //Appel au reactualisation de la page
        this.ngOnInit();
      })
      console.log(this.comptes)
  //} while (this.comptes!=null);
  }

  validerPret() {
    this.empruntService.postPret(this.donnees,this.num_compte)
      .subscribe(data => {
        this.onGetAllComptes();
        this.showSuccess();
        alert("Opération éffectué avec succès");

      }, err => {
        console.log(err);
      })

  }



  onGetAllComptes() {
    this.compteService.getAllCompte()
      .subscribe(data => {
        this.comptes = data;
      }, err => {
        console.log(err);
      })
  }

  /*
    onGetAllDivisions(){
      this.clientService.getAllCompte()
        .subscribe(data=>{
          this.divisions=data;
          console.log(data);
        },err=>{
          console.log(err);
        })
    }

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
  }*/



}
