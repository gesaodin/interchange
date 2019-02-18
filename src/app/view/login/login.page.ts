import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/service/security/login.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private loginService: LoginService, 
              private loadingController: LoadingController, 
              private router: Router,
              private authFire: AngularFireAuth ) { 

   this.loadConnect()
  }

  async loadConnect(){

    const loading = await this.loadingController.create({
      message: 'Cargando...'
    })
    await loading.present();
    firebase.auth().onAuthStateChanged( user => {
        if(user){
          loading.dismiss();
          this.router.navigate(['home', 'balance'])
        }else{
          loading.dismiss();
        }
    })
  }
  async doGoogleLogin(){
    const loading = await this.loadingController.create({
      message : 'Iniciando sesión...'
    });
    await loading.present();

    this.loginService.googleLogin().then(() => {
      loading.dismiss();
      this.router.navigate(['home', 'balance'])
    });

  }

  twitterLogin(){
   
  }
  facebookLogin(){
    
  }

  signOut(){
    this.loginService.singOut().then((res) => {
      console.log("@respuesta: ", res)
    }).catch((e) => {
      console.log("@erro: ", e)
    })

  }
  ngOnInit() {
  }

}
