import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../../Shared/application.service';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EmpruntService} from '../emprunt.service';

@Component({
  selector: 'app-view-emprunt',
  templateUrl: './view-emprunt.component.html',
  styleUrls: ['./view-emprunt.component.css']
})
export class ViewEmpruntComponent implements OnInit {

  id;
  emprunts;
  date=new Date();

  constructor(private applicationService:ApplicationService, private empruntService: EmpruntService,
              public router:Router,public toastr: ToastrService,public activatedRoute:ActivatedRoute) {
    this.id= activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.onGetOneEmprunt(this.id);
  }
code_compte;
  onGetOneEmprunt(c) {
    this.empruntService.getOneEmprunt(c)
      .subscribe(data => {
        this.emprunts = data;
        this.code_compte=this.emprunts.compte.code_compte;
      }, err => {
        console.log(err);
      })
  }

  imprimerPret() {

  }


}
