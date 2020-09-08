import {Component, OnInit, ViewChild} from '@angular/core';
import {OpecourComponent} from '../opecour/opecour.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApplicationService} from '../../Shared/application.service';
import {DialogService} from '../../Shared/dialog.service';
import {OpecourService} from '../opecour.service';

@Component({
  selector: 'app-opecour-list',
  templateUrl: './opecour-list.component.html',
  styleUrls: ['./opecour-list.component.css']
})
export class OpecourListComponent implements OnInit {

  constructor(private opecourService:OpecourService,
              private dialog: MatDialog,
              private dialogService:DialogService,
              private applicationService:ApplicationService) { }


  displayedColumns : string[] = ['code_ope_cour','libelle_operation','type_operation','actif','actions'];
  private matdatasource;
  dataSource;
  searchKey:string;
  code_compte;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.code_compte = JSON.parse(localStorage.getItem('num_compte'));
    this.onGetAllOpecour(this.code_compte);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onGetAllOpecour(code_compte) {
    this.matdatasource = new MatTableDataSource([]);
    this.opecourService.getAllOpecour(code_compte)
      .subscribe(data => {
        this.matdatasource.data = data;
        this.dataSource=this.matdatasource;

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

  onCreate() {
    this.opecourService.initialiseFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(OpecourComponent, dialogConfig);

  }

  onEdit(row) {
    this.opecourService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(OpecourComponent, dialogConfig);
  }

  onDelete(code_ope_cour) {
    this.dialogService.openConfirmDialog("Etes vous sure de supprimer cet enregistrement ?")
      .afterClosed().subscribe(res =>{
      if (res){
        console.log(res);
        this.opecourService.deleteOpecour(code_ope_cour);
        this.applicationService.showSuccess();
      }
    })

  }
}
