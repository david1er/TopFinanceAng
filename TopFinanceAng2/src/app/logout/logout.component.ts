import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../Shared/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authentificationService:AuthentificationService,
              private router:Router) { }

  ngOnInit() {
    let conf = confirm("Etes vous sur de vouloir quitter ?");
    if (!conf) return;
    this.authentificationService.logout();
    this.router.navigateByUrl("/");
  }

}

