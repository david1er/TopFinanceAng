import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthentificationService} from '../Shared/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authentificationService:AuthentificationService,
              private router:Router) { }

  ngOnInit() {
  }

  onLogin(data){
    this.authentificationService.login(data)
      .subscribe(resp=>{
        console.log(resp);
        let jwt=resp.headers.get('Authorization');
        this.authentificationService.saveToken(jwt);
        this.router.navigateByUrl("/");
      },err=>{

      })
  }

  isAdmin(){
    return this.authentificationService.isAdmin();
  }

  isUser(){
    return this.authentificationService.isUser();
  }

}
