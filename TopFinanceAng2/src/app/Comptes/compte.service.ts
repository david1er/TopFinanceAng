import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationService} from '../Shared/application.service';
import {AuthentificationService} from '../Shared/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private http:HttpClient ,private applicationService:ApplicationService,private authService:AuthentificationService) { }

  postRessource(url,data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(url,data,{headers:headers});
  }

  getAllCompte(){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/comptes",{headers:headers});
  }

  getAllCompteEp(){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/comptesEp",{headers:headers});
  }

  getAllCompteEpActif(){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/comptesEpActif",{headers:headers});
  }

  getAllCompteCr(){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/comptesCr",{headers:headers});
  }

  getOneCompte(code){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/comptes/"+code,{headers:headers});
  }

  deleteRessource(c){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.delete(this.applicationService.host+"/comptes/"+c,{headers:headers});
  }
}
