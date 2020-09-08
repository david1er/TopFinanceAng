import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilisateurService} from '../Shared/utilisateur.service';
import {AuthentificationService} from '../Shared/authentification.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ApplicationService} from '../Shared/application.service';
import {ModeReglementService} from '../Shared/mode-reglement.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  reactiveForm:FormGroup;
  mode = 'new-cpte';
  comptes;
  divisions;
  conf;

  displayedColumns : string[] = ['username',/*'roles',*/'actions'];

  dataSource;
  searchKey:string;
  private matdatasource;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private applicationService:ApplicationService,private utilisateurService:UtilisateurService,private fb: FormBuilder, public router:Router,public toastr: ToastrService) {
    this.reactiveForm=this.fb.group(
      {username:new FormControl('',[Validators.required])
        ,
        password:new FormControl(''),
        confirmedPassword:new FormControl(''),
       // actived:new FormControl('')
      }
    )
  }

  errorSuccess(){
    this.applicationService.errorSuccess();
    this.mode = 'new-cpte';
    this.reactiveForm.reset();
  }

  ngOnInit() {
    this.onGetAllUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onGetAllUsers() {
    this.matdatasource = new MatTableDataSource([]);
    this.utilisateurService.getAllUsers()
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

  onDelete(c) {

    let conf = confirm("Etes vous sur de vouloir supprimer ?");
    if (!conf) return;
    this.utilisateurService.deleteRessource(c)
      .subscribe(data => {
        this.onGetAllUsers();

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

  onSaveUser(data) {
    //recuperation de url
    let url = this.applicationService.host + "/register";
    //Acces a la methode postRessource de Compte Service et envoie des données
    this.utilisateurService.postRessource(url, data)
      .subscribe(data => {
        this.applicationService.showSuccess();
        this.mode = 'new-cpte';
        this.onGetAllUsers();
        this.reactiveForm.reset();

      }, err => {
        this.toastr.error(err.error.message, 'Top Finance!');
        console.log(err);
      })
  }

  currentCompte;

  onEdit(c) {
    this.utilisateurService.getRessource(this.applicationService.host + "/reglements/" + c)
      .subscribe(data => {
        this.currentCompte = data;
        this.mode = 'edit-cpte';
        console.log(this.currentCompte)

      }, err => {
        console.log(err);
      })
  }
}

