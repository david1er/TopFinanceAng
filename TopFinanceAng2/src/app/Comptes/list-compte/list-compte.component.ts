import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CompteService} from '../compte.service';
import {ClientService} from '../../Clients/client.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ApplicationService} from '../../Shared/application.service';
import {DialogService} from '../../Shared/dialog.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-compte',
  templateUrl: './list-compte.component.html',
  styleUrls: ['./list-compte.component.css']
})
export class ListCompteComponent implements OnInit {
  comptes;
  compteActive;
  displayedColumns : string[] = ['code_compte','type_compte','compte_operationnel','client','actions'];

  dataSource;
  searchKey:string;
  private matdatasource;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private compteService:CompteService, private clientService:ClientService,
              private applicationService:ApplicationService, private fb: FormBuilder,
              public router:Router,public toastr: ToastrService,private dialog: MatDialog,
              private dialogService:DialogService,) { }

  ngOnInit() {
    this.onGetAllComptes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onGetAllComptes() {
    this.matdatasource = new MatTableDataSource([]);
    this.compteService.getAllCompte()
      .subscribe(data => {
        this.comptes = data;
        this.matdatasource.data = data;
        this.dataSource=this.matdatasource;
        console.log(data);
      }, err => {
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

  onDelete(c) {

    let conf = confirm("Etes vous sur de vouloir supprimer ?");
    if (!conf) return;
    this.compteService.deleteRessource(c)
      .subscribe(data => {
        this.onGetAllComptes();
        this.applicationService.showSuccess()

      }, err => {
        console.log(err);
      })

  }

  onEdit(id:number){
    this.router.navigate(['edit_compte',id]);
  }

  onView(code_compte: any) {
    this.router.navigate(['view_compte',code_compte]);
  }

}
