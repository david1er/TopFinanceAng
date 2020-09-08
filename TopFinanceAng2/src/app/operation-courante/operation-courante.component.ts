import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ApplicationService} from '../Shared/application.service';
import {ModeReglementService} from '../Shared/mode-reglement.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {OperationCouranteService} from '../Shared/operation-courante.service';
import {OperationService} from '../Operations/operation.service';
import {CompteService} from '../Comptes/compte.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../Shared/dialog.service';

@Component({
  selector: 'app-operation-courante',
  templateUrl: './operation-courante.component.html',
  styleUrls: ['./operation-courante.component.css']
})
export class OperationCouranteComponent implements OnInit {
  comptes;
  reactiveForm:FormGroup;
  mode = 'new-cpte';
  reactiveForm2:FormGroup;
  code_compte;
  nom_compte;
  compteActive;
  modeActive=JSON.parse(localStorage.getItem('modeActive'));
  comptesNom;
  reglements;

  displayedColumns : string[] = ['compte','libelle_operation','type_operation','montant','actions'];

  dataSource;
  searchKey:string;
  private matdatasource;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private operationCouranteService:OperationCouranteService,
              private compteService:CompteService,
              private modeReglementService:ModeReglementService,
              private applicationService:ApplicationService,
              private fb: FormBuilder,
              public router:Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              private dialogService:DialogService,) {

    this.reactiveForm=this.fb.group(
      {libelle_operation:new FormControl('',[Validators.required, Validators.compose([Validators.minLength(1)])])
        ,
        code_ope_cour:new FormControl('',[Validators.minLength(1)]),
        montant:new FormControl(''),
        //comptabilise:new FormControl('',[]),
        actif:new FormControl('',[]),
        code:new FormControl('',[]),
        mode:new FormControl(''),
        type_operation:new FormControl(''),
        motif:new FormControl('',[])}
    )

    this.reactiveForm2=this.fb.group(
      {code_compte:new FormControl('',[])},
      {nom_client:new FormControl('',[])}
    )
  }

  ngOnInit() {
    //Récupération de l'objet num_compte
    this.code_compte = JSON.parse(localStorage.getItem('num_compte'));
    if(this.code_compte=null){
      this.code_compte="CE0001";
    }
    this.nom_compte = JSON.parse(localStorage.getItem('num_compte'));

    this.onGetCompteOpeCourante(this.code_compte);
    this.onGetAllComptes();
    this.onGetAllReglement();
    this.chargerCompte(this.code_compte);
    this.ChercherCompteOnInit();
    if(this.modeActive==null) {
      this.modeActive = 'code';
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  errorSuccess(){
    this.applicationService.errorSuccess();
  }

  onGetAllReglement(){
    this.modeReglementService.getAllReglement()
      .subscribe(data => {
        this.reglements = data;
      }, err => {
        console.log(err);
      })
  }

  onSaveCompte(data,code_compte) {
    data.code=code_compte;
    data.comptabilise=true;
    console.log(data);

    //Acces a la methode postRessource de Compte Service et envoie des données
    this.operationCouranteService.postData(data)
      .subscribe(data => {
        this.applicationService.showSuccess();
        this.onGetCompteOpeCourante(this.code_compte);
// @ts-ignore
        this.num_ope=data.numero_operation;
        this.chargerCompte(this.code_compte);

      }, err => {
        console.log(err);
      })
  }

  onSaveReglement(data) {
    //recuperation de url
    let url = this.applicationService.host + "/reglements";
    //Acces a la methode postRessource de Compte Service et envoie des données
    this.operationCouranteService.postRessource(url, data)
      .subscribe(data => {
        this.applicationService.showSuccess();
        this.mode = 'new-cpte';
        this.onGetAllComptes();
        this.reactiveForm.reset();

      }, err => {
        console.log(err);
      })
  }

  transform(value: string, args: any[]): string {
    if(value) {
      return value.replace(',', '.');
    }
    return '';
  }

  onGetCompteOpeCourante(code_compte) {
    this.matdatasource = new MatTableDataSource([]);
    this.operationCouranteService.getOneCompte(code_compte)
      .subscribe(data => {
        this.comptes = data;
        this.matdatasource.data = data;
        this.dataSource=this.matdatasource;
        console.log(this.comptes);
      }, err => {
        // this.toastr.warning(err.error.message, "Top Finance!!!");
        console.log(err);
      })
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onSearchClear() {
    this.searchKey="";
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onGetAllComptes() {
    this.compteService.getAllCompteEp()
      .subscribe(data => {
        this.comptesNom = data;
        console.log(this.comptesNom);
      }, err => {
        console.log(err);
      })
  }

  chargerCompte(code_compte){
    this.compteService.getOneCompte(this.code_compte)
      .subscribe(data => {
        this.compteActive = data;
        console.log(this.compteActive);

      }, err => {
        console.log(err);
        //  this.toastr.warning(err.error.message, "Top Finance!!!");
      })
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onActiveNom() {
    this.modeActive = 'nom';
    localStorage.setItem('modeActive',JSON.stringify(this.modeActive));
  }

  onActiveCode() {
    this.modeActive = 'code';
    localStorage.setItem('modeActive',JSON.stringify(this.modeActive));
  }


  monObjet;

  ChercherCompte(form: NgForm){
    if(form.value.code_compte==null){

      this.code_compte=form.value.nom_compte;

    }else {
      this.code_compte = form.value.code_compte;

    }
    //this.code_compte = form.value.nom_compte;
    localStorage.setItem('num_compte',JSON.stringify(this.code_compte));

    this.monObjet = JSON.parse(localStorage.getItem('num_compte'));
    this.code_compte=this.monObjet;
    this.onGetCompteOpeCourante(this.code_compte);
    this.chargerCompte(this.code_compte);

    if (this.compteActive==null){
      alert("Compte introuvable");
    }

  }

  ChercherCompteOnInit(){

    this.code_compte = JSON.parse(localStorage.getItem('num_compte'));
    this.onGetCompteOpeCourante(this.code_compte);
    this.chargerCompte(this.code_compte);

  }

  onDelete(code_ope_cour) {

    let conf = confirm("Etes vous sur de vouloir supprimer ?");
    if (!conf) return;
    this.operationCouranteService.deleteRessource(code_ope_cour)
      .subscribe(data => {
        this.applicationService.deleteSuccess();
        this.onGetCompteOpeCourante(this.code_compte);

      }, err => {
        console.log(err);
      })

  }


  currentCompte;

  onEdit(c) {
    console.log(c)
    this.operationCouranteService.getRessource(this.applicationService.host + "/opecour1/" + c)
      .subscribe(data => {
        this.currentCompte = data;
        this.mode = 'edit-cpte';
        console.log(this.currentCompte)

      }, err => {
        console.log(err);
      })
  }

}

