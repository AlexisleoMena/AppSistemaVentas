import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, Register } from '../../../../core/Interfaces';
import { UsuarioService } from 'src/app/modules/home/services/usuario.service';
import { UtilidadService } from 'src/app/shared/utilidad.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formularioLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authServicio: AuthService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioLogin = this.fb.group({
      nombreCompleto: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  iniciarSesion() {
    this.mostrarLoading = true;

    const request: Register = {
      nombreCompleto: this.formularioLogin.value.nombreCompleto,
      correo: this.formularioLogin.value.email,
      clave: this.formularioLogin.value.password,
    };

    this._authServicio.Registrar(request).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/authenticate/login');
        } else {
          this._utilidadServicio.mostarAlerta(
            'No se pudo registrar.',
            'Opps!'
          );
        }
      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error: () => {
        this._utilidadServicio.mostarAlerta('Ha ocurrido un error.', 'Opps!');
      },
    });
  }
}
