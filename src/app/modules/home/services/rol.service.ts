import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseApi } from '../../../core/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url: string = environment.endpoint + "Rol/";

  constructor(private http: HttpClient) { }

  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(this.url + "Lista");
  }
}
