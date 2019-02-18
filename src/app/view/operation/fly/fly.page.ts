import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Fly, FlyService } from 'src/app/service/model/operation/fly.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fly',
  templateUrl: './fly.page.html',
  styleUrls: ['./fly.page.scss'],
})
export class FlyPage implements OnInit {

  fly: Fly = {
    uid : '',
    today: new Date(),
    origen: '',
    destino: '',
    fromDate: '',
    toDate: '',
    status: false,
  }
  flys : Fly[];
  constructor(private navCtrl: NavController,
    private router: Router, 
    private flyService: FlyService,
    private alertController: AlertController,
    private loadingController: LoadingController) {

     
    }

  loadAll(){
      this.flyService.getAll().subscribe( res => {
        this.flys = res;
      })
    }
    ngOnInit() {
      this.loadAll();
    }
  async messageController(msg: string){
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: msg,
      buttons: ['Ok']
    })
    await alert.present();
  }
  
  validate(){
    if(this.fly.origen == '' || this.fly.destino == '' || this.fly.fromDate == ''  ){
      this.messageController('Todos los campos son obligatorios')
    }else{
      this.addData()
    }
  }

  async addData(){
    this.fly.uid = firebase.auth().currentUser.uid;
    const loading = await this.loadingController.create({
      message : 'Enviando información..'
    });
    await loading.present();

    await this.flyService.add(this.fly);
    this.fly = {
      uid : '',
      today: new Date(),
      origen: '',
      destino: '',
      fromDate: '',
      toDate: '',
      status: false,
    }
    loading.dismiss();
    
  }

  goBack(){
    this.navCtrl.navigateBack(['/home/operation']);
  }
}
