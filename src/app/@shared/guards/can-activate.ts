import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/@app/auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  isUserLoggedIn: boolean = false;
  sub: Subscription | undefined;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.doesUserExist().then((value) => {
      if (value) {
        return true;
      } else {
        this.router.navigateByUrl('/auth');
        return false;
      }
    });
  }

  async doesUserExist() {
    const { value } = await Preferences.get({ key: 'app_user' });
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
}
