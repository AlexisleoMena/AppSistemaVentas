import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Menu } from 'src/app/core/Interfaces/menu';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

import { MenuService } from 'src/app/modules/home/services/menu.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {
  listaMenus: Menu[] = [];
  correoUsuario: string = '';
  rolUsuario: string = '';

  constructor(
    private router: Router,
    private _menuServicio: MenuService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    const usuario = this._authService.obtenerSesionUsuario();

    if (usuario != null) {
      this.correoUsuario = usuario.correo;
      this.rolUsuario = usuario.rolDescripcion;

      this._menuServicio.lista(usuario.idUsuario).subscribe({
        next: (data) => {
          if (data.status) this.listaMenus = data.value;
        },
        error: (e) => {},
      });
    }
  }

  cerrarSesion() {
    this._authService.cerrarSesion();
    this.router.navigate(['login']);
  }
}
