import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseApi, Venta } from '../../../core/Interfaces';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private url: string = environment.endpoint + 'Venta/';

  constructor(private http: HttpClient) {}

  registrar(req: Venta): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.url + 'Registrar', req);
  }

  historial(
    buscarPor: string,
    numeroVenta: string,
    fechaInicio: string,
    fechaFin: string
  ): Observable<ResponseApi> {
    const params = new HttpParams()
      .set('buscarPor', buscarPor)
      .set('numeroVenta', numeroVenta)
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);

    return this.http.get<ResponseApi>(this.url + 'Historial', { params });
  }

  resporte(fechaInicio: string, fechaFin: string): Observable<ResponseApi> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);

    return this.http.get<ResponseApi>(this.url + 'Reporte', { params });
  }
}
