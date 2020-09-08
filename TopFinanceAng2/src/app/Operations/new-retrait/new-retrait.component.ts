import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ApplicationService} from '../../Shared/application.service';
import {OpecourService} from '../../OpeCour/opecour.service';
import {CompteService} from '../../Comptes/compte.service';
import {ModeReglementService} from '../../Shared/mode-reglement.service';
import {OperationService} from '../operation.service';

@Component({
  selector: 'app-new-retrait',
  templateUrl: './new-retrait.component.html',
  styleUrls: ['./new-retrait.component.css']
})
export class NewRetraitComponent implements OnInit {

  reactiveForm:FormGroup;
  compteActive;
  divisions;
  conf;
  imprimeButton='non';
  num_ope;
  code;
  reglements;
  code_compte;
  employe;
  opeCour;
  opeCours;
  ope_cours;
  libelle_operation1;
  mode;

  constructor(private operationService:OperationService,private compteService:CompteService, private modeReglementService:ModeReglementService,
              private applicationService:ApplicationService, private fb: FormBuilder,
              public router:Router,public toastr: ToastrService, private opeCourService:OpecourService) {
    this.reactiveForm=this.fb.group(
      {
        code:new FormControl('',[]),
        libelle_operation:new FormControl('',[]),
        montant:new FormControl('',[Validators.required]),
        mode:new FormControl('',[Validators.required]),
        date_valeur:new FormControl('',[Validators.required]),
        comptabilise:new FormControl('',[]),
        employe:new FormControl('',[]),
        motif:new FormControl('',[])
      }
    )

  }

  //Pour la notification

  errorSuccess(){
    this.toastr.error('Opération non éffectuée', 'Top Finance!');
  }

  ngOnInit() {
    //Récupération de l'objet numCompte
    this.code_compte = JSON.parse(localStorage.getItem('num_compte'));
    this.employe = JSON.parse(localStorage.getItem('employe'));
    this.chargerCompte(this.code_compte);
    this.onGetAllReglement();
    this.onGetOpeCour(this.code_compte);
  }
  chargerCompte(code_compte){
    this.compteService.getOneCompte(this.code_compte)
      .subscribe(data => {
        this.compteActive = data;
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

  onGetOpeCour(code_compte){
    this.opeCourService.getOneOpecourRet(code_compte)
      .subscribe(data => {
        this.opeCours = data;
        //  console.log(this.opeCours);
      }, err => {
        console.log(err);
      })
  }

  onGetOneOpeCour(id_opecour){
    this.opeCourService.getOneOpecour(id_opecour)
      .subscribe(data => {
        this.opeCour = data;
        this.init();

      }, err => {
        console.log(err);
      })
  }

  init(){
    this.reactiveForm.patchValue({
      libelle_operation: this.opeCour.libelle_operation,
      montant: this.opeCour.montant,
      mode: this.opeCour.mode.id_reglement,
      comptabilise: this.opeCour.comptabilise,
      motif: this.opeCour.motif
    });
  }

  ChercherCompte(form: NgForm){
    this.ope_cours=form.value.libelle_operation1;
    this.onGetOneOpeCour(this.ope_cours);
  }

  onSaveCompte(data,code_compte) {
    data.employe=this.employe;
    //Acces a la methode postRessource de Compte Service et envoie des données
    this.operationService.postRetrait(data,code_compte)
      .subscribe(data => {
        this.applicationService.showSuccess();
        this.imprimeButton='oui';

        this.chargerCompte(this.code_compte);

        //Recupération de la derniere operation
        this.operationService.getLastOperation().subscribe(data =>{
          // @ts-ignore
          this.num_ope=data.numero_operation;
          console.log(this.num_ope);
        })

      }, err => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'Top Finance!');
      })
  }

}

