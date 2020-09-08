import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {DialogService} from '../../Shared/dialog.service';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ApplicationService} from '../../Shared/application.service';
import {EmpruntService} from '../../Emprunts/emprunt.service';
import {RemboursementService} from '../remboursement.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-list-remb',
  templateUrl: './list-remb.component.html',
  styleUrls: ['./list-remb.component.css']
})
export class ListRembComponent implements OnInit {

  comptes;
  reactiveForm2:FormGroup;
  code_pret;
  nom_compte;
  pretActive;
  soldee='oui';
  modeActive=JSON.parse(localStorage.getItem('modeActive'));

  displayedColumns : string[] = ['date_remb','montant_remb','total_remb','reste_a_remb','actions'];

  dataSource;
  searchKey:string;
  private matdatasource;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private rembService:RemboursementService,
              private pretService:EmpruntService,
              private applicationService:ApplicationService,
              private fb: FormBuilder,
              public router:Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              private dialogService:DialogService) {

    this.reactiveForm2=this.fb.group(
      {code_pret:new FormControl('',[])}
    )
  }

  ngOnInit() {
    //Récupération de l'objet code_pret
    this.code_pret = JSON.parse(localStorage.getItem('code_pret'));
    if(this.code_pret=null){
      this.code_pret="CE0001";
    }
    this.nom_compte = JSON.parse(localStorage.getItem('code_pret'));

    this.onGetRemboursements(this.code_pret);
    this.chargerCompte(this.code_pret);
    this.ChercherCompteOnInit();
    if(this.modeActive==null) {
      this.modeActive = 'code';
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onGetRemboursements(code_pret) {
    this.matdatasource = new MatTableDataSource([]);
    this.rembService.getRemboursements(code_pret)
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

  chargerCompte(code_pret){
    this.pretService.getOneEmprunt(code_pret)
      .subscribe(data => {
        this.pretActive = data;
        if (this.pretActive.reste==0){
          this.soldee='oui';
          console.log(this.soldee)
        }else {
          this.soldee='non';
        }
        console.log(this.pretActive);

      }, err => {
        console.log(err);
      })

  }

  ChercherCompte(form: NgForm){

    this.code_pret = form.value.code_pret;

    localStorage.setItem('code_pret',JSON.stringify(this.code_pret));

    this.code_pret=JSON.parse(localStorage.getItem('code_pret'));
    this.onGetRemboursements(this.code_pret);
    this.chargerCompte(this.code_pret);

    if (this.pretActive.reste=0){
      this.soldee='oui';
      console.log(this.soldee)
    }else {
      this.soldee='non';
    }

    if (this.pretActive==null){
      alert("Pret introuvable");
    }

  }

  ChercherCompteOnInit(){

    this.code_pret = JSON.parse(localStorage.getItem('code_pret'));
    this.onGetRemboursements(this.code_pret);
    this.chargerCompte(this.code_pret);

  }





}


