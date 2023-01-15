import { AppStorageService } from 'src/app/services/app-storage.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private appStorageService: AppStorageService) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const currentUser = this.appStorageService.getAccountInfo;
        console.log(currentUser);
        if (currentUser && currentUser.userInformationId >0 &&  currentUser.key.length >0 && currentUser.token.length >0) {
            //this.router.navigate(['/' + route.routeConfig.path]);
            return true;
        }
        else
        {
            this.router.navigate(['/'],{queryParams: {login: 1}});
            return false;
        }
    }
}
