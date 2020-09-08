import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {DialogService} from '../Shared/dialog.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ApplicationService} from '../Shared/application.service';
import {CompteService} from '../Comptes/compte.service';
import {ClientService} from '../Clients/client.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-situation-compte',
  templateUrl: './situation-compte.component.html',
  styleUrls: ['./situation-compte.component.css']
})
export class SituationCompteComponent implements OnInit {
  comptes;
  compteActive;
  displayedColumns : string[] = ['code_compte','client','solde'];

  dataSource;
  searchKey:string;
  private matdatasource;
  isLoading = true;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private compteService:CompteService, private clientService:ClientService,
              private applicationService:ApplicationService, private fb: FormBuilder,
              public router:Router,public toastr: ToastrService,private dialog: MatDialog,
              private dialogService:DialogService) { }

  ngOnInit() {
    this.onGetAllComptes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onGetAllComptes() {
    this.matdatasource = new MatTableDataSource([]);
    this.compteService.getAllCompteEpActif()
      .subscribe(data => {
        this.comptes = data;
        this.matdatasource.data = data;
        this.dataSource=this.matdatasource;

        this.isLoading = false;
        console.log(data);
      }, err => {
        console.log(err);
        error => this.isLoading = false
      })
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ongetOneCompte(code_compte){
    this.compteService.getOneCompte(code_compte)
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
    this.compteService.deleteRessource(c)
      .subscribe(data => {
        this.onGetAllComptes();

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

}
