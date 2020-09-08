import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ApplicationService} from '../Shared/application.service';
import {ModeReglementService} from '../Shared/mode-reglement.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-mode-reglement',
  templateUrl: './mode-reglement.component.html',
  styleUrls: ['./mode-reglement.component.css']
})
export class ModeReglementComponent implements OnInit {

  reactiveForm:FormGroup;
  mode = 'new-cpte';
  comptes;
  divisions;
  conf;

  displayedColumns : string[] = ['code_reglement','libelle_reglement','commentaire','actions'];

  dataSource;
  searchKey:string;
  private matdatasource;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private applicationService:ApplicationService,private modeReglementServive:ModeReglementService,private fb: FormBuilder, public router:Router,public toastr: ToastrService) {
    this.reactiveForm=this.fb.group(
      {libelle_reglement:new FormControl('',[Validators.required, Validators.compose([Validators.minLength(1)])])
        ,
        code_reglement:new FormControl('',[Validators.minLength(1)]),
        id_reglement:new FormControl('',[Validators.minLength(1)]),
        commentaire:new FormControl('') }
    )
  }

  errorSuccess(){
    this.applicationService.errorSuccess();
    this.mode = 'new-cpte';
    this.reactiveForm.reset();
  }

  ngOnInit() {
    this.onGetAllReglement();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onGetAllReglement() {
    this.matdatasource = new MatTableDataSource([]);
    this.modeReglementServive.getAllReglement()
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
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onGetAllReglement1() {
    this.modeReglementServive.getAllReglement()
      .subscribe(data => {
        this.comptes = data;
      }, err => {
        console.log(err);
      })
  }

  onDelete(c) {

    let conf = confirm("Etes vous sur de vouloir supprimer ?");
    if (!conf) return;
    this.modeReglementServive.deleteRessource(c)
      .subscribe(data => {
        this.onGetAllReglement();

      }, err => {
        console.log(err);
      })
  }

  onNewCompte() {
    this.mode = 'new-cpte';
  }

  onRetourConsultation() {
    this.mode = 'list';
  }

  onSaveReglement(data) {
    //recuperation de url
    let url = this.applicationService.host + "/reglements";
    //Acces a la methode postRessource de Compte Service et envoie des données
    this.modeReglementServive.postRessource(url, data)
      .subscribe(data => {
        this.applicationService.showSuccess();
        this.mode = 'new-cpte';
        this.onGetAllReglement();
        this.reactiveForm.reset();

      }, err => {
        console.log(err);
      })
  }

  currentCompte;

  onEdit(c) {
    this.modeReglementServive.getRessource(this.applicationService.host + "/reglements/" + c)
      .subscribe(data => {
        this.currentCompte = data;
        this.mode = 'edit-cpte';
        console.log(this.currentCompte)

      }, err => {
        console.log(err);
      })
  }
}

