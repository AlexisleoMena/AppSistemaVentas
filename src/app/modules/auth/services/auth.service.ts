import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import {
  Login,
  Register,
  ResponseApi,
  Sesion,
  Usuario,
} from 'src/app/core/Interfaces';
import { AuthStatus } from 'src/app/core/Interfaces/auth-status';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.endpoint + 'Usuario/';
  private http = inject(HttpClient);

  private _currentUser = signal<Sesion | null>(null);
  public currentUser = computed(() => this._currentUser());

  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  iniciarSesion(body: Login): Observable<boolean> {
    const url = this.url + "iniciarSesion";

    return this.http.post<ResponseApi>(url, body).pipe(
      map((res) => res.status && this.setAuthentication(res.value)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  Registrar(form: Register): Observable<boolean> {
    const url = this.url + "Guardar";
    const body = { ...form, idRol: 1 };
    return this.http.post<ResponseApi>(url, body).pipe(
      map((res) => res.status),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  private setAuthentication(user: Sesion): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('usuario', JSON.stringify(user));
    return true;
  }

  checkAuthStatus(): Observable<boolean> {
    const url = this.url + "VerificarToken";

    let user = localStorage.getItem('usuario');
    if (!user) {
      this.cerrarSesion();
      return of(false);
    }
    const body = JSON.parse(user);

    return this.http.post<ResponseApi>(url, body).pipe(
      map((res) => res.status && this.setAuthentication(res.value)),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  obtenerSesionUsuario() {
    const dataCadena = localStorage.getItem('usuario');
    const usuario = JSON.parse(dataCadena!);
    return usuario;
  }
}
