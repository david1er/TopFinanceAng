import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationService} from './application.service';
import {AuthentificationService} from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {
  constructor(private http:HttpClient,private applicationService:ApplicationService, private authService:AuthentificationService) { }

  rechercheM(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/rechercheM/"+data.choix_libelle_operation+"/"+ data.libelle_operation+"/"+data.choix_motif+"/"+ data.motif+"/"+data.choix_employe+"/"
      +data.employe+"/"+data.choix_compte+"/"+data.compte+"/"+data.choix_type_operation+"/"+data.type_operation+"/"+data.choix_montant+"/"+data.montant+"/"
      +data.choix_reglement+"/"+data.reglement+"/"+data.choix_comptabilise+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche/"+ data.libelle_operation+"/"+data.employe+"/"+data.compte+"/"+data.type_operation+"/"+data.montant+"/"+data.reglement+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche2(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche2/"+ data.libelle_operation+"/"+data.employe+"/"+data.compte+"/"+data.type_operation+"/"+data.montant+"/"+data.reglement+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche3(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche3/"+ data.libelle_operation+"/"+data.employe+"/"+data.compte+"/"+data.type_operation+"/"+data.montant+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche4(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche4/"+ data.libelle_operation+"/"+data.employe+"/"+data.compte+"/"+data.type_operation+"/"+data.montant+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche5(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche5/"+ data.libelle_operation+"/"+data.employe+"/"+data.compte+"/"+data.type_operation+"/"+data.reglement+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche6(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche6/"+ data.libelle_operation+"/"+data.employe+"/"+data.compte+"/"+data.type_operation+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche7(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche7/"+ data.libelle_operation+"/"+data.employe+"/"+data.compte+"/"+data.type_operation+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche8(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche8/"+ data.libelle_operation+"/"+data.employe+"/"+data.compte+"/"+data.montant+"/"+data.reglement+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche9(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche9/"+ data.libelle_operation+"/"+data.employe+"/"+data.compte+"/"+data.reglement+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche10(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche10/"+ data.libelle_operation+"/"+data.employe+"/"+data.compte+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche11(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche11/"+ data.libelle_operation+"/"+data.employe+"/"+data.compte+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche12(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche12/"+ data.libelle_operation+"/"+data.employe+"/"+data.type_operation+"/"+data.montant+"/"+data.reglement+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche13(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche13/"+ data.libelle_operation+"/"+data.employe+"/"+data.montant+"/"+data.reglement+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche14(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche14/"+ data.libelle_operation+"/"+data.employe+"/"+data.reglement+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche15(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche15/"+ data.libelle_operation+"/"+data.employe+"/"+data.comptabilise+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche16(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche16/"+ data.libelle_operation+"/"+data.employe+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche17(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche17/"+ data.employe+"/"+data.type_operation+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche18(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche18/"+ data.employe+"/"+data.type_operation+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche19(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche19/"+ data.employe+"/"+data.type_operation+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche20(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche20/"+ data.employe+"/"+data.type_operation+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche21(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche21/"+ data.employe+"/"+data.type_operation+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }

  recherche22(data){
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host +"/recherche22/"+ data.employe+"/"+data.type_operation+"/"+data.dateOpDeb+"/"+data.dateOpFin+"/"+data.dateValDeb+"/"+data.dateValFin,{headers:headers});
  }
}
