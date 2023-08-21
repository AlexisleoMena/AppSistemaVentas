import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UtilidadService } from 'src/app/shared/utilidad.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private router = inject(Router);
  private utilidad = inject(UtilidadService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.router.navigateByUrl('authenticate/login');
            this.utilidad.mostarAlerta(
              'No tienes autorización para acceder a esta página.',
              'Acceso Denegado'
            );
            break;

          case 403:
            this.utilidad.mostarAlerta(
              'No tienes permisos para acceder a esta página.',
              'Acceso Prohibido'
            );
            break;

          case 404:
            this.utilidad.mostarAlerta(
              'El recurso que estás buscando no se ha encontrado.',
              'Recurso No Encontrado'
            );
            break;

          default:
            this.utilidad.mostarAlerta(
              'Se ha producido un error inesperado. Por favor, intenta nuevamente más tarde.',
              'Error'
            );
            break;
        }

        return throwError(error);
      })
    );
  }
}
