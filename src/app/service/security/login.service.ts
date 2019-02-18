import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { FirebaseAuth } from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user : Observable<firebase.User>;
  authState : FirebaseAuth = null;
  constructor( private afAuth: AngularFireAuth, private gplus: GooglePlus, private platform: Platform) {
    
    this.user = this.afAuth.authState;
    
  }

  async googleLogin(): Promise<void>{
    if(this.platform.is('cordova')){
      return await this.googleNative();      
    }else{
      return await this.googleLWeb();
    }   
  }

  async googleNative(): Promise<void> {
    try {
      console.log('native')
      const gplusUser = await this.gplus.login({
        'webClientId': '1098567340728-lonpn3d3faof9qmrndee66aa5haiponj.apps.googleusercontent.com', //'1098567340728-vf0027q47a7e5ujc1du0fb4e6lu2u15o.apps.googleusercontent.com',
        'offline': true,
        'scopes': ''
      });      
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)      
      await this.afAuth.auth.signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      ) 
    } catch (error) {
      
    }

  }

  async googleLWeb(): Promise<void>{
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider);
    } catch(err) {
      console.log(err)
    }
  }


  async facebookNative(): Promise<void>{
    try {
      
      await this.afAuth.auth.signInWithCredential(
        firebase.auth.FacebookAuthProvider.credential('')
      ) 
    }catch (err) {

    }
  }
  async singOut(): Promise<void>{
    if(this.platform.is('cordova')){
      this.gplus.logout();
    }
    return await this.afAuth.auth.signOut();

  }

  

 
}
