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
  selector: 'app-new-versement',
  templateUrl: './new-versement.component.html',
  styleUrls: ['./new-versement.component.css']
})
export class NewVersementComponent implements OnInit {

  reactiveForm:FormGroup;
  compteActive;
  divisions;
  conf;
  mode1 = 'new-cpte';
  code;
  reglements;
  code_compte;
  employe;
  opeCour;
  opeCours;
  ope_cours;
  libelle_operation1;
  mode;
  imprimeButton='non';
  num_ope;

  constructor(private operationService:OperationService,private compteService:CompteService,
              private modeReglementService:ModeReglementService, private opeCourService:OpecourService,
              private applicationService:ApplicationService, private fb: FormBuilder,
              public router:Router,public toastr: ToastrService) {
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
this.numero_operation
  }

  //Pour la notification
  private numero_operation: any;



  errorSuccess(){
    this.toastr.error('Opération non éffectuée', 'Gestion Courrier!');
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

  onGetOpeCour(code_compte){
    this.opeCourService.getOneOpecourVers(code_compte)
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
    this.numero_operation;

    //Acces a la methode postRessource de Compte Service et envoie des données
    this.operationService.postVersement(data,code_compte)
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
        console.log(err);
      })
  }

}
