import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseApi } from '../../../core/Interfaces';


@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  private url: string = environment.endpoint + 'DashBoard/';

  constructor(private http: HttpClient) {}

  resumen(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(this.url + "Resumen");
  }

}
