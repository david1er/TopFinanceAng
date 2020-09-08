import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/Shared/dialog.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { EmpruntService } from '../emprunt.service';
import {ApplicationService} from '../../Shared/application.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-emprunt',
  templateUrl: './list-emprunt.component.html',
  styleUrls: ['./list-emprunt.component.css']
})
export class ListEmpruntComponent implements OnInit {
  comptes;
  compteActive;
  displayedColumns : string[] = ['numero_pret','compte','capital','date_effet_pret','montant_total','reste','actions'];

  dataSource;
  searchKey:string;
  private matdatasource;
  reactiveForm:FormGroup;
  reponses;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private empruntService:EmpruntService,
              private applicationService:ApplicationService, private fb: FormBuilder,
              public router:Router,public toastr: ToastrService,private dialog: MatDialog,
              private dialogService:DialogService,) {
    this.reactiveForm=this.fb.group({
        choix_nom:new FormControl(''),
        nom:new FormControl(''),
        choix_remboursse:new FormControl(''),
        remboursse:new FormControl(''),
        choix_montant:new FormControl(''),
        montant1:new FormControl(''),
        montant2:new FormControl(''),
        choix_date:new FormControl(''),
        date1:new FormControl(''),
        date2:new FormControl('')
      }
    )
  }

  ngOnInit() {
    this.onGetAllEmprunts();
  }

  errorSuccess(){
    this.applicationService.errorSuccess();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onGetAllEmprunts() {
    this.matdatasource = new MatTableDataSource([]);
    this.empruntService.getAllEmprunts()
      .subscribe(data => {
        this.comptes = data;
        this.matdatasource.data = data;
        this.dataSource=this.matdatasource;
        console.log(this.dataSource);
      }, err => {
        console.log(err);
      })
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ongetOneCompte(code_compte){
    this.empruntService.getOneEmprunt(code_compte)
      .subscribe(data => {
        this.compteActive = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  onDeleteCompte(c) {

    let conf = confirm("Etes vous sur de vouloir supprimer ?");
    if (!conf) return;
    this.empruntService.deleteRessource(c)
      .subscribe(data => {
        this.onGetAllEmprunts();

      }, err => {
        console.log(err);
      })
  }

  onSearchClear() {
    this.searchKey="";
    // this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  choix_nom="nean";
  nom="nean";
  choix_remboursse="nean";
  remboursse="nean";
  choix_montant="nean";
  montant1="nean";
  montant2="nean";
  choix_date="nean";
  date1="nean";
  date2="nean";

  onRechercher(data) {
    console.log(data);
    this.choix_nom = data.choix_nom;
    this.choix_remboursse = data.choix_remboursse;
    this.choix_montant = data.choix_montant;
    this.choix_date = data.choix_date;

    if (data.choix_nom == 'indifferent') {
      data.nom = "nean";
    } else if (data.choix_nom == 'contient') {
      data.nom = data.nom;
    }

    if (data.choix_remboursse == 'indifferent') {
      data.remboursse = "nean";
    } else if (data.choix_remboursse == 'egale') {
      data.remboursse = data.remboursse;
    }

    if (data.choix_montant == 'indifferent') {
      data.montant1 = "nean";
      data.montant2 = "nean";
    } else if (data.choix_montant == 'egale') {
      data.montant1 = data.montant1;
      data.montant2 = data.montant2;
    }

    if (data.choix_date == 'indifferent') {
      data.date1 = "nean";
      data.date2 = "nean";
    } else if (data.choix_date == 'egale') {
      data.date1 = data.date1;
      data.date2 = data.date2;
    }

    //Controle sur le statut des champs du formulaire
    if (this.choix_nom == "") {
      this.toastr.warning('Veillez choisir le statut du nom & Prénom', 'Top Finance!');
    } else if (this.choix_remboursse == "") {
      this.toastr.warning('Veillez choisir le statut de l\'etat de l\'emprunt', 'Top Finance!');
    } else if (this.choix_montant == "") {
      this.toastr.warning('Veillez choisir le statut du montant', 'Top Finance!');
    } else if (this.choix_date == "") {
      this.toastr.warning('Veillez choisir le statut du mode de la date', 'Top Finance!');
    } else {
      //Fin Controle sur le statut des champs du formulaire

      this.matdatasource = new MatTableDataSource([]);
      this.empruntService.rechercheEmp(data)
        .subscribe(data => {
          this.comptes = data;
          this.matdatasource.data = data;
          this.dataSource=this.matdatasource;
          console.log(this.dataSource);
        }, err => {
          console.log(err);
        })
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });


     /* this.empruntService.rechercheEmp(data)
        .subscribe(data => {
          this.reponses = data;
          console.log(this.reponses)
        }, err => {
          console.log(err);
        })*/
    }
  }

  onRemboursser(numero_pret: any) {
    localStorage.setItem('code_pret',JSON.stringify(numero_pret));
    this.router.navigate(['new_remb']);
  }

  onViewRemb(numero_pret: any) {
    localStorage.setItem('code_pret',JSON.stringify(numero_pret));
    this.router.navigate(['list_remb']);
  }

  onView(numero_pret: any) {
    this.router.navigate(['view_emprunt',numero_pret]);
  }
}

