import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentificationService} from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  public host: string = "http://127.0.0.1:7000";

  constructor(private toastr: ToastrService, private http: HttpClient,private authService:AuthentificationService) {
  }

  //Pour la notification
  showSuccess() {
    this.toastr.success('Opération éffectuée avec succes', 'Top Finance!');
  }

  deleteSuccess() {
    this.toastr.warning('Suppression éffectuée avec succes', 'Top Finance!');
  }

  errorSuccess() {
    this.toastr.error('Opération non éffectuée', 'Top Finance!');
  }

  //Pour la sauvegarde et la restauration
  sauvegarderBD() {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.host + "/sauvegarder",{headers:headers});
  }

  restaurerBD(dateRestauration) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.host + "/restaurer/" + dateRestauration,{headers:headers});
  }

  getTotalCpteEp() {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.host + "/comptes/getTotalCpteEp",{headers:headers});
  }

  getTotalCpteEm() {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.host + "/comptes/getTotalCpteEm",{headers:headers});
  }

  getTotalClient() {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.host + "/clients/getTotalClient",{headers:headers});
  }

  getTotalUtilisateur() {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.host + "/user/getTotalUser",{headers:headers});
  }
}
