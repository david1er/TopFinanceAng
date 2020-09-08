import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApplicationService} from '../Shared/application.service';

@Component({
  selector: 'app-restaurer-bd',
  templateUrl: './restaurer-bd.component.html',
  styleUrls: ['./restaurer-bd.component.css']
})
export class RestaurerBDComponent implements OnInit {

  reactiveForm;
  dateRestauration;
  constructor(private applicationService:ApplicationService, private fb: FormBuilder,
              public router:Router,public toastr: ToastrService) {

    this.reactiveForm=this.fb.group(
      {
        dateRestauration:new FormControl('',[])
      }
    )

  }

  ngOnInit() {
  }

  errorSuccess(){
    this.toastr.error('Opération non éffectuée', 'Gestion Courrier!');
  }

  onRestaurer(data) {
    console.log(data.dateRestauration);
    this.dateRestauration=data.dateRestauration;
    this.applicationService.restaurerBD(this.dateRestauration)
      .subscribe(data => {
        this.applicationService.showSuccess();

      }, err => {
        console.log(err);
      })
  }

}
