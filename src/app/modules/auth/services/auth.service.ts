import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Login, ResponseApi, Sesion, Usuario } from 'src/app/core/Interfaces';
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

  iniciarSesion(req: Login): Observable<boolean> {
    return this.http.post<ResponseApi>(this.url + 'iniciarSesion', req).pipe(
      map((res) => {
        if(res.status) {
          return this.setAuthentication(res.value)
        }
        return false;
      }),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  // register(name: string, email: string, password: string): Observable<boolean> {
  //   const url = `${this.url}/auth/register`;
  //   const body = { email, password, name };

  //   return this.http.post<Sesion>(url, body)
  //     .pipe(
  //       map((user) => this.setAuthentication(user)),
  //       catchError((err) => throwError(() => err.error.message)
  //     )
  //   );
  // }

  private setAuthentication(user: Sesion): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('usuario', JSON.stringify(user));
    return true;
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.url}VerificarToken`;
    let userString = localStorage.getItem('usuario');
    if (!userString) {
      this.cerrarSesion();
      return of(false);
    }

    let user = JSON.parse(userString);

    console.log("userString", typeof userString, "user", user)
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${user.token}`
    );

    return this.http.get<boolean>(url, { headers }).pipe(
      map(() => this.setAuthentication(user)),
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
    const dataCadena = localStorage.getItem("usuario");
    const usuario = JSON.parse(dataCadena!);
    return usuario;
  }
}
