import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../Shared/dialog.service';
import {Router} from '@angular/router';
import {ApplicationService} from '../../Shared/application.service';
import {CompteService} from '../../Comptes/compte.service';
import {OperationService} from '../operation.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.css']
})
export class RetraitComponent implements OnInit {

  comptes;
  reactiveForm2:FormGroup;
  code_compte;
  nom_compte;
  compteActive;
  modeActive=JSON.parse(localStorage.getItem('modeActive'));
  comptesNom;

  displayedColumns : string[] = ['actions1','date_valeur','libelle_operation','montant','date_operation','comptabilise','actions'];

  dataSource;
  searchKey:string;
  private matdatasource;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private operationService:OperationService,
              private compteService:CompteService,
              private applicationService:ApplicationService,
              private fb: FormBuilder,
              public router:Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              private dialogService:DialogService) {

    this.reactiveForm2=this.fb.group(
      {code_compte:new FormControl('',[])},
      {nom_client:new FormControl('',[])}
    )
  }

  ngOnInit() {
    //Récupération de l'objet num_compte
    this.code_compte = JSON.parse(localStorage.getItem('num_compte'));
    if(this.code_compte==null){
      this.code_compte="CE0001";
    }
    this.nom_compte = JSON.parse(localStorage.getItem('num_compte'));

    this.onGetCompteRetrait(this.code_compte);
    this.onGetAllComptes();
    this.chargerCompte(this.code_compte);
    console.log(this.code_compte)
    this.ChercherCompteOnInit();
    if(this.modeActive==null) {
      this.modeActive = 'code';
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onGetCompteRetrait(code_compte) {
    this.matdatasource = new MatTableDataSource([]);
    this.operationService.getCompteRetrait(code_compte)
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
    // this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  /*  onEdit(row) {
      this.employeeService.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(EmployeeComponent, dialogConfig);
    }

    onDelete($key) {
      this.dialogService.openConfirmDialog("Etes vous sure de supprimer cet enregistrement ?")
        .afterClosed().subscribe(res =>{
        if (res){
          console.log(res);
          this.employeeService.deleteEmployee($key);
          this.applicationService.errorSuccess();
        }
      })

    }*/

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
    this.compteService.getOneCompte(code_compte)
      .subscribe(data => {
        this.compteActive = data;
        console.log(this.compteActive);
        if (this.compteActive==null){
          alert("Compte introuvable");
        }

      }, err => {
        console.log(err);
        this.toastr.warning(err.error.message, "Top Finance!!!");
      })
  }

  selectCompte(num){
//console.log(num);
    localStorage.setItem('num_compte',JSON.stringify(num));
//console.log(num);
    this.monObjet = JSON.parse(localStorage.getItem('num_compte'));
    this.code_compte=this.monObjet;

    this.onGetCompteRetrait(num);
    this.chargerCompte(num);
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
    this.onGetCompteRetrait(this.code_compte);
    this.chargerCompte(this.code_compte);



  }

  ChercherCompteOnInit(){

    this.code_compte = JSON.parse(localStorage.getItem('num_compte'));
    this.onGetCompteRetrait(this.code_compte);
    this.chargerCompte(this.code_compte);

  }

  onDeleteVersement(numero_operation,code_compte,montant){
    let conf = confirm("Etes vous sur de vouloir supprimer ?");
    if (!conf) return;
    this.operationService.deleteVersement(numero_operation,code_compte,montant)
      .subscribe(data => {
        this.onGetCompteRetrait(this.code_compte);

      }, err => {
        console.log(err);
      })
  }

  onDelete(numero_operation,code_compte,montant) {

    let conf = confirm("Etes vous sur de vouloir supprimer ?");
    if (!conf) return;
    this.operationService.deleteRetrait(numero_operation,code_compte,montant)
      .subscribe(data => {
        this.onGetAllComptes();
        this.onGetCompteRetrait(this.code_compte);
        this.chargerCompte(this.code_compte);
        this.applicationService.showSuccess()

      }, err => {
        console.log(err);
      })

  }

  onEdit(id:number){
    this.router.navigate(['edit_retrait',id]);
  }

}
