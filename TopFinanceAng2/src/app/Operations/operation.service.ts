import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationService} from '../Shared/application.service';
import {AuthentificationService} from '../Shared/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  constructor(private http:HttpClient,private applicationService:ApplicationService,private authService:AuthentificationService) {

  }

  postVersement(data,code_compte){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.put(this.applicationService.host +"/versement"+  "/"+ code_compte+"/"+data.montant,data,{headers:headers});
  }

  postVirement1(data,code_compte){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.put(this.applicationService.host +"/virement"+  "/"+ code_compte+"/"+data.cpte2+"/"+data.montant,data,{headers:headers});
  }

  postVirement2(data,code_compte){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.put(this.applicationService.host +"/virement"+  "/"+ data.cpte2+"/"+code_compte+"/"+data.montant,data,{headers:headers});
  }

  getCompteVersement(code){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/versement/"+code,{headers:headers});
  }

  getOperations(code){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/operations/"+code,{headers:headers});
  }

  deleteVersement(numero_operation,code_compte,montant){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.delete(this.applicationService.host+"/versement/"+ numero_operation+ "/" +code_compte+ "/"+ montant,{headers:headers});
  }

  postRetrait(data,code_compte){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.put(this.applicationService.host +"/retrait"+  "/"+ code_compte+"/"+data.montant,data,{headers:headers});
  }

  getCompteRetrait(code){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/retrait/"+code,{headers:headers});
  }

  deleteRetrait(numeroOperation,code_compte,montant){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.delete(this.applicationService.host+"/retrait/"+ numeroOperation+ "/" +code_compte+ "/"+ montant,{headers:headers});
  }

  imprimVers(num_ope) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/recuVers/"+num_ope,{headers:headers});
  }

  imprimRetrait(num_ope) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/recuRet/"+num_ope,{headers:headers});
  }

  getOpeWithPeriode(dateDebut, dateFin) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/operations/"+dateDebut+"/"+dateFin,{headers:headers});
  }

  getOneOperation(numero_operation){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/operation/"+numero_operation,{headers:headers});
  }

  getLastOperation(){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host+"/lastOperation/",{headers:headers});
  }

  putVersement(numero_operation, code_compte, montant, data) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.put(this.applicationService.host+"/versement/"+ numero_operation+ "/" +code_compte+ "/"+ montant,data,{headers:headers});
  }

  putRetrait(numero_operation, code_compte, montant, data) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.put(this.applicationService.host+"/retrait/"+ numero_operation+ "/" +code_compte+ "/"+ montant,data,{headers:headers});
  }
}
