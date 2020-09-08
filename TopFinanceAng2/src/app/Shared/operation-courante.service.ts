import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationService} from './application.service';
import {AuthentificationService} from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class OperationCouranteService {

  constructor(private http:HttpClient, private applicationService:ApplicationService, private authService:AuthentificationService) { }

  getAllRessource(){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/opecour",{headers:headers});
  }

  getOneCompte(code){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/opecour/"+code,{headers:headers});
  }

  getRessource(url){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(url,{headers:headers});
  }

  deleteRessource(c){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.delete(this.applicationService.host+"/opecour/"+c,{headers:headers});
  }

  postData(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(this.applicationService.host +"/opecour/"+data.code,data,{headers:headers});
  }

  postRetrait(data,code_compte){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.put(this.applicationService.host +"/retrait"+  "/"+ code_compte+"/"+data.montant,data,{headers:headers});
  }

  postRessource(url,data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(url,data,{headers:headers});
  }
}
