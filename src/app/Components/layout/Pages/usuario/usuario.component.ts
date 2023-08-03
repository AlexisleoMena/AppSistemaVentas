import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from '../../../../Interfaces';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit, AfterViewInit {
  columnasTabla: string[] = [
    'nombreCompleto',
    'correo',
    'rolDescripcion',
    'estado',
    'acciones',
  ];
  dataInicio: Usuario[] = [];
  dataListaUsuarios = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _usuarioService: UsuarioService,
    private _utilidadService: UtilidadService
  ) {}

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla;
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this._usuarioService.lista().subscribe({
      next: (data) => {
        if (data.value) {
          this.dataListaUsuarios.data = data.value;
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
    this.dataListaUsuarios.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoUsuario() {
    this.dialog
      .open(ModalUsuarioComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'true') this.obtenerUsuarios();
      });
  }

  editarUsuario(usuario: Usuario) {
    this.dialog
      .open(ModalUsuarioComponent, {
        disableClose: true,
        data: usuario,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'true') this.obtenerUsuarios();
      });
  }

  eliminarUsuario(usuario: Usuario) {
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      text: usuario.nombreCompleto,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((res) => {
      if (res.isConfirmed) {
        this._usuarioService.eliminar(usuario.idUsuario).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadService.mostarAlerta(
                'El usuario fue eliminado',
                'Listo!'
              );
              this.obtenerUsuarios();
            } else {
              this._utilidadService.mostarAlerta(
                'No se pudo eliminar el usuario',
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
