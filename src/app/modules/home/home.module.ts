import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

import { DashBoardComponent } from '../../modules/home/pages/dash-board/dash-board.component';
import { UsuarioComponent } from '../../modules/home/pages/usuario/usuario.component';
import { ProductoComponent } from '../../modules/home/pages/producto/producto.component';
import { VentaComponent } from '../../modules/home/pages/venta/venta.component';
import { HistorialVentaComponent } from '../../modules/home/pages/historial-venta/historial-venta.component';
import { ReporteComponent } from '../../modules/home/pages/reporte/reporte.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { ModalUsuarioComponent } from './modals/modal-usuario/modal-usuario.component';
import { ModalProductoComponent } from './modals/modal-producto/modal-producto.component';
import { ModalDetalleVentaComponent } from './modals/modal-detalle-venta/modal-detalle-venta.component';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    DashBoardComponent,
    UsuarioComponent,
    ProductoComponent,
    VentaComponent,
    HistorialVentaComponent,
    ReporteComponent,
    ModalUsuarioComponent,
    ModalProductoComponent,
    ModalDetalleVentaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
