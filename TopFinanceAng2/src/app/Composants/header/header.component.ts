import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../Shared/authentification.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  employeInfo;
  employe_id;
  employe_nom;
  employe;

  constructor(private authenticationService:AuthentificationService,
              private http:HttpClient) { }

  ngOnInit(): void {
    this.employe = JSON.parse(localStorage.getItem('employe'));

    //this.onDetailEmploye();
  }

//REcherche des infos sur l'employe
/*  onDetailEmploye(){
    this.authenticationService.detailEmploye(this.employe)
      .subscribe(data => {
        // @ts-ignore
        this.employe_id=data.id;

        // @ts-ignore
        this.employe_nom=data.nom_user;

        console.log(this.employe_id);
      }, err => {
        console.log(err);
      })
  }*/
}
