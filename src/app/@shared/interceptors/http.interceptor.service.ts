import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.doesUserTokenExist()).pipe(
      switchMap((authToken:any) => {
        if (authToken) {
          const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${authToken.token}` },
          });
          return next.handle(authReq);
        }
        return next.handle(req);
      })
    );
  }

  async doesUserTokenExist(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'app_user' });
    return JSON.parse(value!) || null
  }
}
