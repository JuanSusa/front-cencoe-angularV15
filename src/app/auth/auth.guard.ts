
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router,UrlTree } from '@angular/router';
import { Observable, map, pipe, tap} from 'rxjs';
import { AuthServiceService } from './services/auth-service.service';
import { Injectable, inject } from '@angular/core';

export const AuthGuard : CanActivateFn = (route, state) => {

  const authService = inject(AuthServiceService);
  const router = inject(Router);
  return authService.isAuthenticated()

};
 

  