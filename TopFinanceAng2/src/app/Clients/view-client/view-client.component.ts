import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../client.service';
import {ApplicationService} from '../../Shared/application.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
  reactiveForm:FormGroup;
  f:FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: number;
  comptes;
  comptes2;
  conf;
  id;


  constructor(private clientService:ClientService,private applicationService:ApplicationService,
              private fb: FormBuilder, public router:Router,
              public toastr: ToastrService,public activatedRoute:ActivatedRoute) {
    this.reactiveForm=this.fb.group(
      {
        code_client:new FormControl(''),
        nom_client:new FormControl('',[Validators.required])
        ,
        email_client:new FormControl('')
        ,
        sexe_client:new FormControl('',[Validators.required]),
        profession:new FormControl('',[Validators.required]),
        date_nais:new FormControl('',[Validators.required]),
        telephone:new FormControl('',[Validators.minLength(1)]),
        numero_cni:new FormControl(''),
        signature:new FormControl(''),
        quartier:new FormControl(''),
        photo:new FormControl('')
      }
    )
    this.id= activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.onGetOneClient(this.id);
    this.onGetOneCompte(this.id);
  }

  onGetOneClient(c) {
    this.clientService.getRessource(c)
      .subscribe(data => {
        this.comptes = data;
        console.log(this.comptes);
      }, err => {
        console.log(err);
      })
  }

  onGetOneCompte(c) {
    this.clientService.getClientCompte(c)
      .subscribe(data => {
        this.comptes2 = data;
        console.log(this.comptes2);
      }, err => {
        console.log(err);
      })
  }

}
