import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationService} from '../Shared/application.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthentificationService} from '../Shared/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class OpecourService {
  constructor(private http:HttpClient, private applicationService:ApplicationService, private authService:AuthentificationService) { }

  form: FormGroup = new FormGroup({
    code_ope_cour:new FormControl(null),
    libelle_operation:new FormControl('',Validators.required),
    type_operation:new FormControl('',Validators.required),
    montant:new FormControl(''),
    motif:new FormControl(''),
    code_cpte:new FormControl(''),
    mode:new FormControl(''),
    actif:new FormControl(false),
    comptabilise:new FormControl(false),
  })

  initialiseFormGroup() {
    this.form.setValue({
      code_ope_cour: null,
      libelle_operation:'',
      type_operation:'',
      montant:'',
      motif:'',
      code_cpte:'',
      mode: '',
      actif:false,
      comptabilise:false
    });
  }
  postRessource(data,code_compte){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(this.applicationService.host+"/opecour/"+code_compte,data,{headers:headers});
  }

  getAllOpecour(code_compte) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/opecour/"+code_compte,{headers:headers});
  }

  populateForm(employee) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    this.form.setValue(employee);
  }

  deleteOpecour(c){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.delete(this.applicationService.host+"/opecour/"+c,{headers:headers});
  }

  getOneOpecour(c){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/opecour1/"+c,{headers:headers});
  }

  getOneOpecourVers(c){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/opecourVers/"+c,{headers:headers});
  }

  getOneOpecourRet(c){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/opecourRet/"+c,{headers:headers});
  }
}
