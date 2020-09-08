import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationService} from './application.service';
import {AuthentificationService} from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ModeReglementService {
  constructor(private http:HttpClient, private applicationService:ApplicationService, private authService:AuthentificationService) { }

  getAllReglement(){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/reglements",{headers:headers});
  }

  getRessource(url){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(url,{headers:headers});
  }

  deleteRessource(c){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.delete(this.applicationService.host+"/reglements/"+c,{headers:headers});
  }

  postRessource(url,data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(url,data,{headers:headers});
  }


}
