import { Component } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthentificationService} from './Shared/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public toastr: ToastrService,
              private authentificationService:AuthentificationService,
              private router:Router){

  }
  comptes;

  ngOnInit(){
    this.authentificationService.loadToken();
    this.authentificationService.parseJWT();
    this.onGetAllComptes();
  }

  onGetAllComptes() {

  }
  user;
  onLogin(data){
    this.authentificationService.login(data)
      .subscribe(resp=>{
        let jwt=resp.headers.get('Authorization');
        this.authentificationService.saveToken(jwt);
        // this.user=this.authentificationService.username;
        console.log(this.authentificationService.username);
        this.showSuccess();
        this.router.navigateByUrl("/acceuil");
      },err=>{
        console.log('Erreur');
        this.errorSuccess();
      })
  }

  showSuccess(){
    this.toastr.success('Authentification reuissi', 'TopFinance!');
  }

  errorSuccess(){
    this.toastr.error('Pseudo ou Mot de Passe Incorrecte', 'TopFinance!');
  }

  infoSuccess(){
    this.toastr.info('Hello David', 'Toastr fun!');
  }

  warningSuccess(){
    this.toastr.warning('Veuillez vous reconnecter', 'TopFinance!');
  }

  isAdmin(){
    return this.authentificationService.isAdmin();
  }

  isUser(){
    return this.authentificationService.isUser();
  }

  isAuthenticated(){
    return this.authentificationService.isAuthenticated();
  }
}
