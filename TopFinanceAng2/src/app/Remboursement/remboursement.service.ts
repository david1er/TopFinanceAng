import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationService} from '../Shared/application.service';
import {AuthentificationService} from '../Shared/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class RemboursementService {
  constructor(private http:HttpClient,private applicationService:ApplicationService, private authService:AuthentificationService) {

  }

  postRemb(data,code_pret){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(this.applicationService.host +"/remboursements"+  "/"+ code_pret+"/"+data.montant_remb,data,{headers:headers});
  }

  getRemboursements(code){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/remboursements/"+code,{headers:headers});
  }
}
