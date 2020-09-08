import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CompteService} from '../../Comptes/compte.service';
import {ClientService} from '../client.service';
import {ApplicationService} from '../../Shared/application.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../Shared/dialog.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  comptes;
  compteActive;
  displayedColumns : string[] = ['nom_client','date_nais','profession','telephone','actions'];

  dataSource;
  searchKey:string;
  private matdatasource;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private clientService:ClientService,
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
    this.clientService.getAllCompte()
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
/*  ongetOneCompte(code_compte){
    this.clientService.getOneCompte(code_compte)
      .subscribe(data => {
        this.compteActive = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }*/

  onDeleteCompte(c) {

    let conf = confirm("Etes vous sur de vouloir supprimer ?");
    if (!conf) return;
    this.clientService.deleteRessource(c)
      .subscribe(data => {
        this.onGetAllComptes();

      }, err => {
        console.log(err);
      })
  }

/*  onEdit(row) {
    this.employeeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }*/

  onDelete(c) {

    let conf = confirm("Etes vous sur de vouloir supprimer ?");
    if (!conf) return;
    this.clientService.deleteRessource(c)
      .subscribe(data => {
        this.onGetAllComptes();
        this.applicationService.showSuccess()

      }, err => {
        console.log(err);
      })

  }

  onEdit(id:number){
    this.router.navigate(['edit_client',id]);
  }

  onSearchClear() {
    this.searchKey="";
    // this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onView(code_client: any) {
    this.router.navigate(['view_client',code_client]);
  }
}
