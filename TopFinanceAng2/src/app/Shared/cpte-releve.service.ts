import { Injectable } from '@angular/core';
import {ApplicationService} from './application.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentificationService} from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class CpteReleveService {

  constructor(private applicationService:ApplicationService,private http:HttpClient, private authService:AuthentificationService) { }

  postArchive(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/cpteRel/"+ data.dateDebut+"/"+data.dateFin,{headers:headers});
  }

}
