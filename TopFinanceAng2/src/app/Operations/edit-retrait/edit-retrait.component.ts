import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {OperationService} from '../operation.service';
import {CompteService} from '../../Comptes/compte.service';
import {ModeReglementService} from '../../Shared/mode-reglement.service';
import {ApplicationService} from '../../Shared/application.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {OpecourService} from '../../OpeCour/opecour.service';

@Component({
  selector: 'app-edit-retrait',
  templateUrl: './edit-retrait.component.html',
  styleUrls: ['./edit-retrait.component.css']
})
export class EditRetraitComponent implements OnInit {
  reactiveForm:FormGroup;
  compteActive;
  divisions;
  conf;
  operations;
  code;
  reglements;
  code_compte;
  employe;
  opeCour;
  opeCours;
  ope_cours;
  libelle_operation1;
  mode;
  modele='non';
  id;
  imprimeButton='non';
  num_ope;

  constructor(private operationService:OperationService,private compteService:CompteService, private modeReglementService:ModeReglementService,
              private applicationService:ApplicationService, private fb: FormBuilder,
              public router:Router,public toastr: ToastrService, private opeCourService:OpecourService,
              public activatedRoute:ActivatedRoute) {
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
    this.id= activatedRoute.snapshot.params['id'];
  }

  //Pour la notification

  errorSuccess(){
    this.toastr.error('Opération non éffectuée', 'Gestion Courrier!');
  }

  ngOnInit() {
    //pour charger l'operation courante
    this.onGetOneCompte(this.id);

    //Récupération de l'objet numCompte
    this.code_compte = JSON.parse(localStorage.getItem('num_compte'));
    this.employe = JSON.parse(localStorage.getItem('employe'));
    this.chargerCompte(this.code_compte);
    this.onGetAllReglement();
    this.onGetOpeCour(this.code_compte);
  }

  onGetOneCompte(c) {
    this.operationService.getOneOperation(c)
      .subscribe(data => {
        this.operations = data;
      }, err => {
        console.log(err);
      })
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
    //recuperation de employe
    data.employe=this.employe;
    data.type_operation="V";
    data.date_operation=new Date();

    //Acces a la methode putRessource de Compte Service et envoie des données
    this.operationService.putRetrait(this.id,code_compte,data.montant,data)
      .subscribe(data => {
        this.applicationService.showSuccess();
        this.imprimeButton='oui';
// @ts-ignore
        this.num_ope =data.numero_operation;
        this.chargerCompte(this.code_compte);

      }, err => {
        console.log(err);
      })
  }

  onDelete(data) {

    let conf = confirm("Etes vous sur de vouloir supprimer ?");
    if (!conf) return;
    this.operationService.deleteRetrait(this.id,this.code_compte,data.montant)
      .subscribe(data => {
        this.applicationService.deleteSuccess();
        this.router.navigate(['retrait']);
      }, err => {
        console.log(err);
      })
  }

  onModele(){
    this.modele='oui';
  }

}

