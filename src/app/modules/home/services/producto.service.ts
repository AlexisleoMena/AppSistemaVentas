import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseApi, Producto } from '../../../core/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = environment.endpoint + "Producto/";

  constructor(private http: HttpClient) { }


  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(this.url + "Lista");
  }

  guardar(req: Producto): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.url + "Guardar", req);
  }

  editar(req: Producto): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(this.url + "Editar", req);
  }

  eliminar(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(this.url + "Eliminar/" + id);
  }

}
