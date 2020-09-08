import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ApplicationService} from '../Shared/application.service';
import {Router} from '@angular/router';
import {RechercheService} from '../Shared/recherche.service';
import {ModeReglementService} from '../Shared/mode-reglement.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  reactiveForm:FormGroup;
  f:FormGroup;
  reponses;
  mode = 'new';

  constructor( private rechercheService:RechercheService,private modeReglementService:ModeReglementService,
               private applicationService:ApplicationService, private fb: FormBuilder,
               public router:Router,public toastr: ToastrService) {
    this.reactiveForm=this.fb.group({
        choix_employe:new FormControl(''),
        employe:new FormControl(''),
        type_operation:new FormControl(''),
        choix_libelle_operation:new FormControl(''),
        libelle_operation:new FormControl(''),
        choix_motif:new FormControl(''),
        motif:new FormControl(''),
        choix_compte:new FormControl(''),
        compte:new FormControl(''),
        choix_reglement:new FormControl(''),
        montant:new FormControl(''),
        comptabilise:new FormControl(''),
        choix_comptabilise:new FormControl(''),
        choix_montant:new FormControl(''),
        choix_type_operation:new FormControl(''),
        reglement:new FormControl(''),
        dateOpDeb:new FormControl('',[Validators.required]),
        dateOpFin:new FormControl('',[Validators.required]),
        dateValDeb:new FormControl('',[Validators.required]),
        dateValFin:new FormControl('',[Validators.required])
      }
    )
  }

  ngOnInit() {
    this.onGetAllReglement();
  }

  errorSuccess(){
    this.applicationService.errorSuccess();
  }

  reglements;
  onGetAllReglement(){
    this.modeReglementService.getAllReglement()
      .subscribe(data => {
        this.reglements = data;
      }, err => {
        console.log(err);
      })
  }

  choix_employe="nean";
  employe="nean";
  type_operation="nean";
  choix_libelle_operation="nean";
  libelle_operation="nean";
  choix_motif="nean";
  motif="nean";
  choix_compte="nean";
  compte="nean";
  choix_reglement="nean";
  montant="nean";
  comptabilise="nean";
  reglement="nean";
  dateOpDeb="nean";
  dateOpFin="nean";
  dateValDeb="nean";
  dateValFin="nean";
  choix_comptabilise="nean";
  choix_montant="nean";
  choix_type_operation="nean";

  onRechercher(data) {
    console.log(data);
    this.choix_employe=data.choix_employe;
    this.choix_type_operation=data.choix_type_operation;
    this.choix_libelle_operation=data.choix_libelle_operation;
    this.choix_compte=data.choix_compte;
    this.choix_reglement=data.choix_reglement;
    this.choix_montant=data.choix_montant;
    this.choix_comptabilise=data.choix_comptabilise;
    this.choix_motif=data.choix_motif;

    if (data.choix_libelle_operation=='indifferent'){
      data.libelle_operation="nean";
    }else if (data.choix_libelle_operation=='contient'){
      data.libelle_operation=data.libelle_operation;
    }

    if (data.choix_motif=='indifferent'){
      data.motif="nean";
    }else if (data.choix_motif=='contient'){
      data.motif=data.motif;
    }

    if (data.choix_employe=='indifferent'){
      data.employe="nean";
    }else if (data.choix_employe=='egale'){
      data.employe=data.employe;
    }

    if (data.choix_compte=='indifferent'){
      data.compte="nean";
    }else if (data.choix_compte=='egale'){
      data.compte=data.compte;
    }

    if (data.choix_type_operation=='indifferent'){
      data.type_operation="nean";
    }else if (data.choix_type_operation=='egale'){
      data.type_operation=data.type_operation;
    }

    if (data.choix_montant=='indifferent'){
      data.montant="nean";
    }else if (data.choix_montant=='egale'){
      data.montant=data.montant;
    }

    if (data.choix_reglement=='indifferent'){
      data.reglement="nean";
    }else if (data.choix_reglement=='egale'){
      data.reglement=data.reglement;
    }

    if (data.choix_comptabilise=='indifferent'){
      data.comptabilise="nean";
    }else if (data.choix_comptabilise=='egale'){
      data.comptabilise=data.comptabilise;
    }


    this.dateOpDeb=data.date;
    this.dateOpFin=data.dateOpFin;
    this.dateValDeb=data.dateValDeb;
    this.dateValFin=data.dateValFin;

    //Controle sur le statut des champs du formulaire
    if (this.choix_libelle_operation==""){
      this.toastr.warning('Veillez choisir le statut du libelle d\'opération', 'Top Finance!');
    }else
      if (this.choix_motif==""){
      this.toastr.warning('Veillez choisir le statut du motif', 'Top Finance!');
    }else
      if (this.choix_employe==""){
      this.toastr.warning('Veillez choisir le statut de l\'employé', 'Top Finance!');
    }else
      if (this.choix_compte==""){
      this.toastr.warning('Veillez choisir le statut du Compte', 'Top Finance!');
    }else
      if (this.choix_reglement==""){
      this.toastr.warning('Veillez choisir le statut du mode de reglement', 'Top Finance!');
    }else
      if (this.choix_type_operation==""){
        this.toastr.warning('Veillez choisir le statut du sens d\'opération', 'Top Finance!');
      }else
      if (this.choix_montant==""){
        this.toastr.warning('Veillez choisir le statut du montant', 'Top Finance!');
      }else
      if (this.choix_comptabilise==""){
        this.toastr.warning('Veillez choisir le statut Comptabilisé', 'Top Finance!');
      }else {
    //Fin Controle sur le statut des champs du formulaire

    this.rechercheService.rechercheM(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })
      }

    //1
/*if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='egale'
  && this.choix_type_operation=='egale' && this.choix_montant=='egale' && this.choix_reglement=='egale'
  && this.choix_comptabilise=='egale'){

  this.rechercheService.recherche(data)
    .subscribe(data => {
      this.reponses = data;
      this.mode='result';
      console.log(this.reponses)
    }, err => {
      console.log(err);
    })

}else
  //2
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='egale'
  && this.choix_type_operation=='egale' && this.choix_montant=='egale' && this.choix_reglement=='egale'
  && this.choix_comptabilise=='indifferent'){

  this.rechercheService.recherche2(data)
    .subscribe(data => {
      this.reponses = data;
      this.mode='result';
      console.log(this.reponses)
    }, err => {
      console.log(err);
    })

}else
  //3
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='egale'
  && this.choix_type_operation=='egale' && this.choix_montant=='egale' && this.choix_reglement=='indifferent'
  && this.choix_comptabilise=='egale'){

  this.rechercheService.recherche3(data)
    .subscribe(data => {
      this.reponses = data;
      this.mode='result';
      console.log(this.reponses)
    }, err => {
      console.log(err);
    })

}else
  //4
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='egale'
  && this.choix_type_operation=='egale' && this.choix_montant=='egale' && this.choix_reglement=='indifferent'
  && this.choix_comptabilise=='indifferent'){

  this.rechercheService.recherche4(data)
    .subscribe(data => {
      this.reponses = data;
      this.mode='result';
      console.log(this.reponses)
    }, err => {
      console.log(err);
    })

}else
  //5
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='egale'
  && this.choix_type_operation=='egale' && this.choix_montant=='indifferent' && this.choix_reglement=='egale'
  && this.choix_comptabilise=='egale'){

  this.rechercheService.recherche5(data)
    .subscribe(data => {
      this.reponses = data;
      this.mode='result';
      console.log(this.reponses)
    }, err => {
      console.log(err);
    })

}else
  //6
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='egale'
  && this.choix_type_operation=='egale' && this.choix_montant=='indifferent' && this.choix_reglement=='indifferent'
  && this.choix_comptabilise=='egale'){

  this.rechercheService.recherche6(data)
    .subscribe(data => {
      this.reponses = data;
      this.mode='result';
      console.log(this.reponses)
    }, err => {
      console.log(err);
    })

}else
    //7
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='egale'
    && this.choix_type_operation=='egale' && this.choix_montant=='indifferent' && this.choix_reglement=='indifferent'
    && this.choix_comptabilise=='indifferent'){

    this.rechercheService.recherche7(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //8
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='egale'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='egale' && this.choix_reglement=='egale'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche8(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //9
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='egale'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='indifferent' && this.choix_reglement=='egale'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche9(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //10
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='egale'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='indifferent' && this.choix_reglement=='indifferent'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche10(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //11
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='egale'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='indifferent' && this.choix_reglement=='indifferent'
    && this.choix_comptabilise=='indifferent'){

    this.rechercheService.recherche11(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //12
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='indifferent'
    && this.choix_type_operation=='egale' && this.choix_montant=='egale' && this.choix_reglement=='egale'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche12(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //13
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='indifferent'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='egale' && this.choix_reglement=='egale'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche13(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //14
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='indifferent'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='indifferent' && this.choix_reglement=='egale'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche14(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //15
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='indifferent'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='indifferent' && this.choix_reglement=='indifferent'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche15(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //16
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='egale' && this.choix_compte=='indifferent'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='indifferent' && this.choix_reglement=='indifferent'
    && this.choix_comptabilise=='indifferent'){

    this.rechercheService.recherche16(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //17
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='indifferent' && this.choix_compte=='egale'
    && this.choix_type_operation=='egale' && this.choix_montant=='egale' && this.choix_reglement=='egale'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche17(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //18
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='indifferent' && this.choix_compte=='indifferent'
    && this.choix_type_operation=='egale' && this.choix_montant=='egale' && this.choix_reglement=='egale'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche18(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //19
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='indifferent' && this.choix_compte=='indifferent'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='egale' && this.choix_reglement=='egale'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche19(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //20
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='indifferent' && this.choix_compte=='indifferent'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='indifferent' && this.choix_reglement=='egale'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche20(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //21
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='indifferent' && this.choix_compte=='indifferent'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='indifferent' && this.choix_reglement=='indifferent'
    && this.choix_comptabilise=='egale'){

    this.rechercheService.recherche21(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }else
    //22
  if(this.choix_libelle_operation=='contient' && this.choix_employe=='indifferent' && this.choix_compte=='indifferent'
    && this.choix_type_operation=='indifferent' && this.choix_montant=='indifferent' && this.choix_reglement=='indifferent'
    && this.choix_comptabilise=='indifferent'){

    this.rechercheService.recherche22(data)
      .subscribe(data => {
        this.reponses = data;
        this.mode='result';
        console.log(this.reponses)
      }, err => {
        console.log(err);
      })

  }*/

  //Pour choix_libelle_operation==indefferent


  }


}
