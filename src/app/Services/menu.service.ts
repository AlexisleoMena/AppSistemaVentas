import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseApi } from '../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url: string = environment.endpoint + "Menu/";
  
  constructor(private http: HttpClient) { }

  lista(idUsuario: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(this.url + "?IdUsuario=" + idUsuario);
  }
}
