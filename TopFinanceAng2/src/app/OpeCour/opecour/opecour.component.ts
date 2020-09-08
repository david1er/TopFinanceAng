import { Component, OnInit } from '@angular/core';
import {OpecourService} from '../opecour.service';
import {ModeReglementService} from '../../Shared/mode-reglement.service';
import {ApplicationService} from '../../Shared/application.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-opecour',
  templateUrl: './opecour.component.html',
  styleUrls: ['./opecour.component.css']
})
export class OpecourComponent implements OnInit {

  constructor(private service:OpecourService,
              private modeReglementServive:ModeReglementService,
              private applicationService:ApplicationService,
              private dialogRef: MatDialogRef<OpecourComponent>) { }
  reglements;
  code_compte;

  departments = [
    {id: 1, value: 'Departement 1'},
    {id: 2, value: 'Departement 2'},
    {id: 3, value: 'Departement 3'}];

  ngOnInit() {
    this.onGetAllReglement();
    this.code_compte = JSON.parse(localStorage.getItem('num_compte'));
  }

  getForm() {
    return this.service.form;
  }

  onGetAllReglement() {
    this.modeReglementServive.getAllReglement()
      .subscribe(data => {
        this.reglements = data;
        console.log(this.reglements);
      }, err => {
        console.log(err);
      })
  }

  onClear() {
    this.service.form.reset();
    this.service.initialiseFormGroup();
    this.applicationService.errorSuccess();
  }

  onSaveEmployee(data) {
    console.log(data)
    this.service.postRessource(data,this.code_compte)
      .subscribe(data => {
        this.applicationService.showSuccess();
//this.onGetAllReglement();
        this.service.form.reset();
        this.service.initialiseFormGroup();

        this.onClose();

      }, err => {
        console.log(err);
      })
  }

  onClose(){
    this.service.form.reset();
    this.service.initialiseFormGroup();
    this.dialogRef.close();
//this.opecourComponent.ngOnInit;
  }
}
