import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationService} from '../Shared/application.service';
import {AuthentificationService} from '../Shared/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {

  constructor(private http:HttpClient,private applicationService:ApplicationService, private authService:AuthentificationService) { }

  postPret(data,num_compte){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(this.applicationService.host +"/prets/"+num_compte,data,{headers:headers});
  }
  getAllEmprunts(){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/prets/",{headers:headers});
  }

  getOneEmprunt(code){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/prets/"+code,{headers:headers});
  }

  deleteRessource(c){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.delete(this.applicationService.host+"/prets/"+c,{headers:headers});
  }

  rechercheEmp(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/rechercheEmp/"+data.choix_nom+"/"+ data.nom+"/"+data.choix_remboursse+"/"
      +data.remboursse+"/"+data.choix_montant+"/"+data.montant1+"/"+data.montant2+"/"+data.choix_date+"/"+data.date1+"/"+data.date2,{headers:headers});
  }
}
