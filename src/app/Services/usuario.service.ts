import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseApi, Login, Usuario } from '../Interfaces';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = environment.endpoint + "Usuario/";
  
  constructor(private http: HttpClient) { }

  iniciarSesion(req: Login): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.url + "IniciarSesion", req);
  }

  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(this.url + "Lista");
  }

  guardar(req: Usuario): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.url + "Guardar", req);
  }

  editar(req: Usuario): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(this.url + "Editar", req);
  }

  eliminar(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(this.url + "Eliminar/" + id);
  }

}
