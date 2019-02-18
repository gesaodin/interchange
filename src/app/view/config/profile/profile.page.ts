import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Profile, ProfileService } from '../../../service/model/config/profile.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  

  imgSrcPhoto = ''; //firebase.auth().currentUser.photoURL;
  email = '';
  nameProfile = '';
  dni = '';
  firstname = '';
  lastname = '';
  phone = '';
  sexo = '';
  reside = '';

  constructor(private router: Router, 
              private profileService: ProfileService, 
              private storage: NativeStorage, 
              private afAuth : AngularFireAuth,
              private loading: LoadingController) {

    
    
        this.loadingData();
       
  }

  ngOnInit() {
  }

  async loadingData(){
    const loading = await this.loading.create({
      message : 'Cargando Datos...'
    });
    await loading.present();
    this.imgSrcPhoto = firebase.auth().currentUser.photoURL;
    this.email = firebase.auth().currentUser.email;
    this.nameProfile = firebase.auth().currentUser.displayName;
   
    await this.profileService.getID().subscribe((profile) => {
      if(profile){
        this.dni = profile.dni
        this.firstname = profile.firstname
        this.lastname = profile.lastname
        this.phone = profile.phone
        this.reside = profile.reside
      }
    });
    loading.dismiss();
  }

  async addData(){
    const loading = await this.loading.create({
      message : 'Enviando información..'
    });
    await loading.present();
    const prf : Profile = {
      cod: 'string',
      dni: this.dni,
      user : 'string',
      firstname : this.firstname,
      lastname: this.lastname,
      phone : this.phone,
      email: this.email,
      reside: this.reside
    }
    await this.profileService.add(prf);
    loading.dismiss();
  }

  goBack(){
    this.router.navigate(['config'])
  }

}
