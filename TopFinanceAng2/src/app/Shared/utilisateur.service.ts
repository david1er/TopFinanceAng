import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthentificationService} from './authentification.service';
import {ApplicationService} from './application.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  public host:string="http://127.0.0.1:8080";

  constructor(private http:HttpClient, private authService:AuthentificationService,private applicationService:ApplicationService) { }

  pushFileToStorage(file: File,data): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    const user=data;

    formdata.append('file', file);
    formdata.append('user', JSON.stringify(user));
    console.log(formdata);
    const req = new HttpRequest('POST', 'http://127.0.0.1:8080/register', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getAllUsers(){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/users/allUsers",{headers:headers});
  }

  getRessource(url){
    return this.http.get(url);
  }

  deleteRessource(c){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.delete(this.applicationService.host+"/users/user/"+c,{headers:headers});
  }


  postRessource(url,data){
    return this.http.post(url,data);
  }

}

