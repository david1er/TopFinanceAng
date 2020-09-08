import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {ApplicationService} from "../Shared/application.service";
import {AuthentificationService} from '../Shared/authentification.service';

@Injectable({
  providedIn: "root",
})
export class ClientService {
  nom_client: any;

  constructor(private http: HttpClient, private applicationService: ApplicationService,private authService:AuthentificationService) { }

  public pushFileToStorage(file: File, data): Observable<HttpEvent<{}>> {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    const formdata: FormData = new FormData();
    const user = data;

    formdata.append("file", file);
    formdata.append("user", JSON.stringify(user));
    // tslint:disable-next-line:no-console
    console.log(formdata);
    const req = new HttpRequest("POST", this.applicationService.host + "/clients", formdata, {
      reportProgress: true,
      responseType: "text",
    });

    return this.http.request(req);
  }

  public uploadPhotoProduct(file: File, data): Observable<HttpEvent<{}>> {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    const formdata: FormData = new FormData();
    const user = data;
    formdata.append("file", file);
    formdata.append("user", JSON.stringify(user));
    console.log(formdata);
    const req = new HttpRequest("POST", this.applicationService.host + "/clients", formdata, {
      reportProgress: true,
      responseType: "text",
    });

    return this.http.request(req);
  }

  public getFiles(): Observable<any> {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get("http://127.0.0.1:8081/courrierArr/getallfiles");
  }

  public chargerFichier(c) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host + "/courrierArr/getFichier/" + c,{headers:headers});
  }

  public getAllCompte1() {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host + "/courrier",{headers:headers});
  }

  public getAllCompte() {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host + "/clients",{headers:headers});
  }

  public getRessource(c) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host + "/clients/" + c,{headers:headers});
  }

  public deleteRessource(c) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.delete(this.applicationService.host + "/clients/" + c,{headers:headers});
  }

  public postRessource(url, data) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(url, data,{headers:headers});
  }

  postClients(url,data) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(url,data,{headers:headers});
  }

  getClientCompte(c: any) {
    let headers= new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.applicationService.host + "/clients/allComptes/" + c,{headers:headers});
  }
}
