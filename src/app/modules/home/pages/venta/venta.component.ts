import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

import { UtilidadService } from 'src/app/shared/utilidad.service';
import { ProductoService } from 'src/app/modules/home/services/producto.service';
import { VentaService } from 'src/app/modules/home/services/venta.service';

import { Producto, Venta, DetalleVenta } from '../../../../core/Interfaces';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent {
  listaProductos: Producto[] = [];
  listaProductosFiltro: Producto[] = [];

  listaProductosParaVenta: DetalleVenta[] = [];
  bloquearBotonRegistrar: boolean = false;

  productoSeleccionado!: Producto;
  tipoDePagoPorDefecto: string = 'Efectivo';
  totalAPagar: number = 0;

  formularioProductoVenta: FormGroup;
  columnasTabla: string[] = [
    'producto',
    'cantidad',
    'precio',
    'total',
    'accion',
  ];
  datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);

  retornarProductosPorFiltro(busqueda: any): Producto[] {
    const valorBuscado =
      typeof busqueda === 'string'
        ? busqueda.toLocaleLowerCase()
        : busqueda.nombre.toLowerCase();
    return this.listaProductos.filter((item) =>
      item.nombre.toLocaleLowerCase().includes(valorBuscado)
    );
  }

  constructor(
    private fb: FormBuilder,
    private _productoServicio: ProductoService,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioProductoVenta = this.fb.group({
      producto: ['', Validators.required],
      cantidad: ['', Validators.required],
    });

    this._productoServicio.lista().subscribe({
      next: (data) => {
        const lista = data.value as Producto[];
        this.listaProductos = lista.filter(
          (p) => p.esActivo == 1 && p.stock > 0
        );
      },
      error: (e) => {},
    });

    this.formularioProductoVenta
      .get('producto')
      ?.valueChanges.subscribe((value) => {
        this.listaProductosFiltro = this.retornarProductosPorFiltro(value);
      });
  }

  mostrarProducto(producto: Producto): string {
    return producto.nombre;
  }

  productoParaVenta(event: any) {
    this.productoSeleccionado = event.option.value;
  }

  agregarProductoParaVenta() {
    const _cantidad: number = this.formularioProductoVenta.value.cantidad;
    const _precio: number = parseFloat(this.productoSeleccionado.precio);
    const _total: number = _cantidad * _precio;

    // Buscar si el producto ya existe en la lista
    const productoExistente = this.listaProductosParaVenta.find(
      (p) => p.idProducto === this.productoSeleccionado.idProducto
    );

    if (productoExistente) {
      // Si el producto ya existe, actualizamos la cantidad y el total
      productoExistente.cantidad = _cantidad;
      productoExistente.totalTexto = String(_total.toFixed(2));
    } else {
      // Si el producto no existe, lo agregamos al array
      this.listaProductosParaVenta.push({
        idProducto: this.productoSeleccionado.idProducto,
        descripcionProducto: this.productoSeleccionado.nombre,
        cantidad: _cantidad,
        precioTexto: String(_precio.toFixed(2)),
        totalTexto: String(_total.toFixed(2)),
      });
    }

    this.totalAPagar = this.listaProductosParaVenta.reduce(
      (total, producto) => total + parseFloat(producto.totalTexto),
      0
    );

    this.datosDetalleVenta = new MatTableDataSource(
      this.listaProductosParaVenta
    );

    this.formularioProductoVenta.patchValue({
      producto: '',
      cantidad: '',
    });
  }

  eliminarProducto(detalle: DetalleVenta) {
    this.totalAPagar = this.totalAPagar - parseFloat(detalle.totalTexto);
    this.listaProductosParaVenta = this.listaProductosParaVenta.filter(
      (p) => p.idProducto != detalle.idProducto
    );

    this.datosDetalleVenta = new MatTableDataSource(
      this.listaProductosParaVenta
    );
  }

  registrarVenta() {
    if (this.listaProductosParaVenta.length > 0) {
      this.bloquearBotonRegistrar = true;

      const req: Venta = {
        tipoPago: this.tipoDePagoPorDefecto,
        totalTexto: String(this.totalAPagar.toFixed(2)),
        detalleVenta: this.listaProductosParaVenta,
      };

      this._ventaServicio.registrar(req).subscribe({
        next: (res) => {
          if (res.status) {
            this.totalAPagar = 0.0;
            this.listaProductosParaVenta = [];
            this.datosDetalleVenta = new MatTableDataSource(
              this.listaProductosParaVenta
            );

            Swal.fire({
              icon: 'success',
              title: 'Venta registrada.',
              text: `Numero de venta: ${res.value.numeroDocumento}`,
            });
          } else {
            this._utilidadServicio.mostarAlerta(
              'No se pudo registrar la venta.',
              'Oops!'
            );
          }
        },
        complete: () => {
          this.bloquearBotonRegistrar = false;
        },
        error: (e) => {},
      });
    }
  }

  resetCantidad() {
    this.formularioProductoVenta.patchValue({
      cantidad: '',
    });
  }
}
