import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CpteReleveService} from '../Shared/cpte-releve.service';
import {ApplicationService} from '../Shared/application.service';

@Component({
  selector: 'app-cpte-releve',
  templateUrl: './cpte-releve.component.html',
  styleUrls: ['./cpte-releve.component.css']
})
export class CpteReleveComponent implements OnInit {
  reactiveForm;
  dateDebut;
  dateFin;

  constructor(private applicationService: ApplicationService,
              private fb: FormBuilder, private cpteReleveService: CpteReleveService,
              public router: Router, public toastr: ToastrService) {

    this.reactiveForm = this.fb.group(
      {
        dateDebut: new FormControl('', []),
        dateFin: new FormControl('', [])
      }
    )

  }

  ngOnInit() {
  }

  onArchive(data) {
    console.log(data);
    this.dateDebut = data.dateDebut;
    this.dateFin = data.dateFin;
    this.cpteReleveService.postArchive(data)
      .subscribe(data => {
        this.applicationService.showSuccess();

      }, err => {
        console.log(err);
      })
  }
}
