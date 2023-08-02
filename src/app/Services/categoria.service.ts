import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseApi } from '../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url: string = environment.endpoint + "Categoria/";
  
  constructor(private http: HttpClient) { }

  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(this.url + "Lista");
  }
}
