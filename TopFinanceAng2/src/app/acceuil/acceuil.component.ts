import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../Shared/application.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  constructor(private applicationService:ApplicationService, public router:Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl('/acceuil', {skipLocationChange:true}).then(() =>{
      this.router.navigate(['AcceuilComponent']);

      this.onGetTotalComptesEp();
      this.onGetTotalComptesEm();
      this.onGetTotalClients();
      this.onGetTotalUtilisateur();
    })
  }
  date=new Date();
  nbreCpteEp;
  nbreCpteEm;
  nbreClients;
  nbreUtilisateurs;

  onGetTotalComptesEp() {
    this.applicationService.getTotalCpteEp()
      .subscribe(data => {
        this.nbreCpteEp = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  onGetTotalComptesEm() {
    this.applicationService.getTotalCpteEm()
      .subscribe(data => {
        this.nbreCpteEm = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  onGetTotalClients() {
    this.applicationService.getTotalClient()
      .subscribe(data => {
        this.nbreClients = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  onGetTotalUtilisateur() {
    this.applicationService.getTotalUtilisateur()
      .subscribe(data => {
        this.nbreUtilisateurs = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

}
