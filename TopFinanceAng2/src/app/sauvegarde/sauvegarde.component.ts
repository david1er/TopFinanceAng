import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sauvegarde',
  templateUrl: './sauvegarde.component.html',
  styleUrls: ['./sauvegarde.component.css']
})
export class SauvegardeComponent implements OnInit {

  public colDefs;
  private gridApi;
  private gridColumnApi;
  private searchValue;
  columnDefs: any;
  rowData: any;

  constructor(private http:HttpClient) { }

  ngOnInit() {
/*
    this.colDefs=[
      {
        headerName:"Age",
        field:"age",
        width:150
      },
      {
        headerName:"Country",
        field:"country",
        width:120,
        lockPosition:true,
        suppressNavigable:true,
        rowDrag:true
      },
      {
        headerName:"Year",
        field:"year",
        width:90
      },
      {
        headerName:"Sport",
        field:"sport",
        width:110
      },
      {
        headerName:"Gold",
        field:"gold",
        width:100
      },
      {
        headerName:"Silver",
        field:"silver",
        width:100
      },
      {
        headerName:"Bronze",
        field:"bronze",
        width:100
      },
      {
        headerName:"Total",
        field:"total",
        width:100
      },
    ]
*/


    this.columnDefs = [
      {headerName: 'Make', field: 'make' },
      {headerName: 'Model', field: 'model' },
      {headerName: 'Price', field: 'price'}
    ];
    //this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');

    this.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
  }

  onGridReady(params){
    this.gridApi=params.api;
    this.gridColumnApi=params.columnApi;
    this.http
      .get("")
      .subscribe(data=>{
        params.api.setRowData(data)
      })
  }

}
