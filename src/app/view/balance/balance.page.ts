import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
//import { GeolocationService } from 'src/app/service/native/geolocation.service';

import * as firebase from 'firebase/app';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  imgSrcPhoto = '';
  name = '';
  constructor(private navCtrl: NavController, 
    private storage: NativeStorage,
    private alertController: AlertController) { 
    
      firebase.auth().onIdTokenChanged( user => {
        if(user){
          this.imgSrcPhoto = user.photoURL;
          this.name = user.displayName;
        }else{
         
          this.messageAlert();
          this.navCtrl.navigateBack(['login'])
        }
    })

      
    
    
    // var geo = new GeolocationService();
    // geo.getCurrentPosition();
    // geo.watchPosition();
   
  }
  
   
  goSettings(){
    this.navCtrl.navigateForward(['config']);    
  }
  ngOnInit() {
  }

  async messageAlert(){
    const alertCtrl = await this.alertController.create({
      header: 'interChange',
      message: 'Su sesión ha finalizado',
      buttons: ['OK']
    })
    await alertCtrl.present();
  }

}
