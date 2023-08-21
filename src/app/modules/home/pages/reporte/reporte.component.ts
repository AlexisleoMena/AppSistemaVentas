import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import * as XLSX from "xlsx"

import { Reporte } from 'src/app/core/Interfaces';
import { VentaService } from 'src/app/modules/home/services/venta.service';
import { UtilidadService } from 'src/app/shared/utilidad.service';

export const MY_DATA_FORMATS={
  parse:{
    dateInput: 'DD/MM/YYYY'
  },
  display:{
    dateInput : 'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY'
  }
}


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  providers:[
    {provide:MAT_DATE_FORMATS, useValue:MY_DATA_FORMATS}
  ]
})
export class ReporteComponent implements OnInit, AfterViewInit {
  formularioFiltro: FormGroup;
  listaVentasReporte: Reporte[] = [];
  columnasTabla: string[] = ['fechaRegistro','numeroVenta','tipoPago','total','producto','cantidad','precio','totalProducto'];
  dataVentaReporte= new MatTableDataSource(this.listaVentasReporte);
  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;

  constructor(
    private fb:FormBuilder,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) {

    this.formularioFiltro = this.fb.group({
      fechaInicio : ['',Validators.required],
      fechaFin : ['',Validators.required]
    })

  }

  ngOnInit(): void {
    this.cargarHistorialUltimaSemana();
  }

  ngAfterViewInit(): void {
    this.dataVentaReporte.paginator = this.paginacionTabla;
  }

  cargarHistorialUltimaSemana() {
    const fechaFin = moment().endOf('day'); // Fecha de hoy al final del día
    const fechaInicio = moment().subtract(1, 'week').startOf('day'); // Fecha hace una semana al inicio del día

    this.formularioFiltro.patchValue({
      buscarPor: 'fecha',
      numero: '',
      fechaInicio: fechaInicio.toDate(),
      fechaFin: fechaFin.toDate()
    });

    this.buscarVentas();
  }

  buscarVentas(){

    const _fechaInicio = moment(this.formularioFiltro.value.fechaInicio).format('DD/MM/YYYY');
    const _fechaFin = moment(this.formularioFiltro.value.fechaFin).format('DD/MM/YYYY');

    if(_fechaInicio === "Invalid date" || _fechaFin === "Invalid date"){
      this._utilidadServicio.mostarAlerta("Debe ingresar ambas fechas","Oops!")
      return;
    }

    this._ventaServicio.resporte(
      _fechaInicio,
      _fechaFin
    ).subscribe({
      next: (data)=>{

        if(data.status){
          this.listaVentasReporte = data.value;
          this.dataVentaReporte.data = data.value;
        }else{
          this.listaVentasReporte = [];
          this.dataVentaReporte.data = [];
          this._utilidadServicio.mostarAlerta("No se encontraron datos","Oops!")
        }
      },
      error:(e) =>{}
    })

  }

  exportarExcel(){
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.listaVentasReporte);

    XLSX.utils.book_append_sheet(wb,ws,"Reporte");
    XLSX.writeFile(wb,"Reporte Ventas.xlsx");

  }
}
