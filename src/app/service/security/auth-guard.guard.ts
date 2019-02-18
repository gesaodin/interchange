import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase'  
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {     
      
      firebase.auth().onIdTokenChanged( user => {
        if(user){
          //console.log('Init Conecting...')
        }else{
          console.log('Disconect...')
        } 
      })
      return new Promise<boolean>((resolve, reject) => {
        this.authConecting().then(e => {          
          resolve(true);
        }).catch(e => {
          this.router.navigate(['login'])
          reject(false);
        })
      });
  }



  authConecting(): Promise<boolean> {    
    return new Promise<boolean>((resolv, reject) => {      
      firebase.auth().onAuthStateChanged( user => {
        if(user){
          return resolv(true);
        }else{
          return reject(false);
        }
      })
    })
  }
}