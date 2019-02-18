import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/security/login.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(private router : Router, 
    private navCtrl : NavController, 
    private login: LoginService
    ) { 
    //console.log('valor de conexion:', this.authService.authenticationState.value);
  }

  goBack(){
    this.router.navigate(['home', 'balance']);
  }
  goProfile(){
    this.navCtrl.navigateForward(['config','profile']);
  }
  goUbication(){
    this.navCtrl.navigateForward(['config','ubication']);
  }
  goBank(){
    this.navCtrl.navigateForward(['config','bank'])
  }
  goMoney(){
    this.navCtrl.navigateForward(['config','money']);
  }
  goCertification(){
    this.navCtrl.navigateForward(['config','certification']);
  }
  goList(){
    this.navCtrl.navigateForward(['config','list']);
  }
  goPin(){
    this.navCtrl.navigateForward(['config','pin']);
  }
  goOperation(){
    this.router.navigate(['/home/operation'])
  }

  async goQuit(){
    
    await this.login.singOut()
    this.router.navigate(['login']);
  }
  ngOnInit() {
  }

}
