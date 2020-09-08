import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ApplicationService} from '../../Shared/application.service';
import {ModeReglementService} from '../../Shared/mode-reglement.service';
import {RemboursementService} from '../remboursement.service';
import {EmpruntService} from '../../Emprunts/emprunt.service';

@Component({
  selector: 'app-new-remb',
  templateUrl: './new-remb.component.html',
  styleUrls: ['./new-remb.component.css']
})
export class NewRembComponent implements OnInit {

  reactiveForm:FormGroup;
  compteActive;
  divisions;
  conf;
  mode1 = 'new-cpte';
  soldee;
  code;
  reglements;
  code_pret;
  employe;
  libelle_operation1;
  mode;

  constructor(private remboursementService:RemboursementService,private empruntService:EmpruntService,
              private modeReglementService:ModeReglementService,
              private applicationService:ApplicationService, private fb: FormBuilder,
              public router:Router,public toastr: ToastrService) {

    this.reactiveForm=this.fb.group(
      {
        code:new FormControl('',[]),
        montant_remb:new FormControl('',[Validators.required]),
        mode:new FormControl('',[Validators.required]),
        date_remb:new FormControl('',[Validators.required]),
        employe:new FormControl('',[]),
        remettant:new FormControl('',[])
      }
    )

  }

  //Pour la notification



  errorSuccess(){
    this.toastr.error('Opération non éffectuée', 'Gestion Courrier!');
  }

  ngOnInit() {
    //Récupération de l'objet numCompte
    this.code_pret = JSON.parse(localStorage.getItem('code_pret'));
    this.employe = JSON.parse(localStorage.getItem('employe'));
    this.chargerPret(this.code_pret);
    this.onGetAllReglement();
  }
  chargerPret(code_pret){
    this.empruntService.getOneEmprunt(this.code_pret)
      .subscribe(data => {
        this.compteActive = data;

        //console.log(this.compteActive)
      }, err => {
        console.log(err);
      })
  }

  onGetAllReglement(){
    this.modeReglementService.getAllReglement()
      .subscribe(data => {
        this.reglements = data;
      }, err => {
        console.log(err);
      })
  }

  onSaveCompte(data,code_pret) {
    //recuperation de employe
    data.employe=this.employe;
    console.log(data)
    //Acces a la methode postRessource de Compte Service et envoie des données
    this.remboursementService.postRemb(data,this.code_pret)
      .subscribe(data => {
        this.applicationService.showSuccess();
        this.reactiveForm.reset();
        this.chargerPret(this.code_pret);


      }, err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Top Finance!');
      })
  }



}

