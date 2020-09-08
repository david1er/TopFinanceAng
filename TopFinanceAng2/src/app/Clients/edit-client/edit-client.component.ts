import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../client.service';
import {ApplicationService} from '../../Shared/application.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  reactiveForm:FormGroup;
  f:FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: number;
  comptes;
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

//Pour la notification
  showSuccess(){
    this.applicationService.showSuccess();
  }
  errorSuccess(){
    this.applicationService.errorSuccess();
  }

  ngOnInit() {
    this.onGetOneCompte(this.id);
  }

  onGetOneCompte(c) {
    this.clientService.getRessource(c)
      .subscribe(data => {
        this.comptes = data;
      }, err => {
        console.log(err);
      })
  }

  onGetAllComptes() {
    this.clientService.getAllCompte()
      .subscribe(data => {
        this.comptes = data;
      }, err => {
        console.log(err);
      })
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    const file=event.target.files[0];

  }

  onSaveCompte(data) {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(data);
    this.clientService.pushFileToStorage(this.currentFileUpload, data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.applicationService.showSuccess();
      }
    },err=>{
      alert("Problème de chargement");
    })

    this.selectedFiles = undefined
  }

}
