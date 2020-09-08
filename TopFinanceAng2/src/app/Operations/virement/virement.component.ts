import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ModeReglementService} from '../../Shared/mode-reglement.service';
import {CompteService} from '../../Comptes/compte.service';
import {OperationService} from '../operation.service';
import {ApplicationService} from '../../Shared/application.service';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {

  reactiveForm:FormGroup;
  compteActive;
  code_compte;

  constructor(private operationService:OperationService,private applicationService:ApplicationService,
              private compteService:CompteService,private modeReglementService:ModeReglementService,
              private fb: FormBuilder, public router:Router,public toastr: ToastrService) {
    this.reactiveForm=this.fb.group(
      {cpte2:new FormControl('',[Validators.required]),
        code_compte:new FormControl('',[]) ,
        montant:new FormControl('',[Validators.required]),
        transfert:new FormControl('',[]),
        mode:new FormControl('',[Validators.required]) ,
        date_valeur:new FormControl('',[Validators.required]),
        comptabilise:new FormControl('',[]),
        motif:new FormControl('',[])
      })
  }


  //Pour la notification

  errorSuccess(){
    this.toastr.error('Opération non éffectuée', 'Gestion Courrier!');
  }
  comptes;
  divisions;
  conf;
  mode = 'new-cpte';
  code;
  reglements;
  employe;

  ngOnInit() {

    //Récupération de l'objet num_compte
    this.code_compte = JSON.parse(localStorage.getItem('num_compte'));

    this.chargerCompte(this.code_compte);
    this.onGetAllReglement();
    this.employe = JSON.parse(localStorage.getItem('employe'));
  }

  chargerCompte(code_compte){
    this.compteService.getOneCompte(this.code_compte)
      .subscribe(data => {
        this.compteActive = data;
      }, err => {
        console.log(err);
      })
  }

  onSaveVirement(data,code_compte) {
    //recuperation de employe
    data.employe=this.employe;
    //
    if (data.transfert=='destination'){
      this.operationService.postVirement1(data,code_compte)
        .subscribe(data => {

          this.applicationService.showSuccess();
          this.mode = 'new-cpte';
          this.chargerCompte(this.code_compte);
          this.reactiveForm.reset();

        }, err => {
          console.log(err);
        })
    }else if (data.transfert=='provenance'){
      this.operationService.postVirement2(data,code_compte)
        .subscribe(data => {

          this.applicationService.showSuccess();
          this.mode = 'new-cpte';
          this.chargerCompte(this.code_compte);
          this.reactiveForm.reset();

        }, err => {
          console.log(err);
        })
    }

  }

  onGetAllReglement(){
    this.modeReglementService.getAllReglement()
      .subscribe(data => {
        this.reglements = data;
      }, err => {
        console.log(err);
      })
  }

}

