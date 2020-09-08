import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../Shared/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sauvegarde-bd',
  templateUrl: './sauvegarde-bd.component.html',
  styleUrls: ['./sauvegarde-bd.component.css']
})
export class SauvegardeBDComponent implements OnInit {

  constructor( private applicationService:ApplicationService,private router:Router) { }

  ngOnInit() {
  }

  onSauvegarde() {
    this.applicationService.sauvegarderBD()
      .subscribe(data => {
        this.applicationService.showSuccess();

      }, err => {
        console.log(err);
      })
  }

  changementDePage = function () {
    this.router.navigate(['/urlVersLaNouvellePage']);
  }
}
