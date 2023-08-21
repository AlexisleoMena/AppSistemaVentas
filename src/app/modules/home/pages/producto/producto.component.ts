import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProductoComponent } from '../../modals/modal-producto/modal-producto.component';
import { Producto } from '../../../../core/Interfaces';
import { ProductoService } from 'src/app/modules/home/services/producto.service';
import { UtilidadService } from 'src/app/shared/utilidad.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = [
    'nombre',
    'categoria',
    'stock',
    'precio',
    'estado',
    'acciones',
  ];
  dataInicio: Producto[] = [];
  dataListaProductos= new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _productoService: ProductoService,
    private _utilidadService: UtilidadService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngAfterViewInit(): void {
    this.dataListaProductos.paginator = this.paginacionTabla;
  }

  obtenerProductos() {
    this._productoService.lista().subscribe({
      next: (data) => {
        if (data.value) {
          this.dataListaProductos.data = data.value;
        } else {
          this._utilidadService.mostarAlerta(
            'No se encontraron datos',
            'Oops!'
          );
        }
      },
      error: (e) => {},
    });
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoProducto() {
    this.dialog
      .open(ModalProductoComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'true') this.obtenerProductos();
      });
  }

  editarProducto(producto: Producto) {
    this.dialog
      .open(ModalProductoComponent, {
        disableClose: true,
        data: producto,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'true') this.obtenerProductos();
      });
  }

  eliminarProducto(producto: Producto) {
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: producto.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((res) => {
      if (res.isConfirmed) {
        this._productoService.eliminar(producto.idProducto).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadService.mostarAlerta(
                'El producto fue eliminado',
                'Listo!'
              );
              this.obtenerProductos();
            } else {
              this._utilidadService.mostarAlerta(
                'No se pudo eliminar el producto',
                'Error'
              );
            }
          },
          error: (e) => {},
        });
      }
    });
  }

}
