import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  host2:string="http://127.0.0.1:7000";
  jwt:string
  username:string
  nom:string
  photo:string
  roles:Array<string>;
  employe;
  employeInfo;
  constructor( private http:HttpClient ) { }

  headers= new HttpHeaders({'authorization':'Bearer '+this.jwt})

  login(data){
    return this.http.post(this.host2+"/login",data,{observe:'response'})
  }

  saveToken(jwt:string){
    localStorage.setItem('token',jwt);
    this.jwt=jwt;
    //console.log(jwt);
    this.parseJWT();
  }

  parseJWT(){
    let jwtHelper=new JwtHelperService();
    let objJWT=jwtHelper.decodeToken(this.jwt);
    //console.log(objJWT);
    this.nom=objJWT.nom;
    this.username=objJWT.obj;
    this.roles=objJWT.roles;
    this.photo=objJWT.photo;
    //console.log(objJWT.sub);
    this.employe=objJWT.sub;
    //this.onDetailEmploye();
    localStorage.setItem('employe',JSON.stringify(objJWT.sub));
  }

//REcherche des infos sur l'employe
/*  onDetailEmploye(){
    this.detailEmploye(this.employe)
      .subscribe(data => {
        this.employeInfo=data;
console.log(data);
      }, err => {
        console.log(err);
      })
  }
  detailEmploye(employe){
    return this.http.get(this.host2+"/user/"+employe)
  }*/


  isAdmin(){
    return this.roles.indexOf('ADMIN')>=0;
  }

  isUser(){
    return this.roles.indexOf('USER')>=0;
  }

  isAuthenticated(){
    return this.roles && (this.isAdmin() || this.isUser());
  }

  logout(){
    localStorage.removeItem('token');
    this.initParams();
  }

  initParams(){
    this.jwt=undefined;
    this.nom=undefined;
    this.username=undefined;
    this.roles=undefined;
    this.photo=undefined;
  }

  loadToken(){
    this.jwt=localStorage.getItem('token');
    this.parseJWT();
  }
}
