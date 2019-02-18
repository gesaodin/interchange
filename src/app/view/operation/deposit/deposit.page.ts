import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Operation, OperationService } from 'src/app/service/model/operation/operation.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  customActionSheetOptions: any = {
    header: 'Banco donde transfirió',
    okText: 'Ok',
    cancelText: 'Cancelar'
  };

  opr : Operation = {
    uid: '',
    name: '',
    status: false,
    type: '',
    dniTo: '',
    dniFrom: '',
    form: 'DEP',
    createAt: new Date(),
    date: '',
    typeMoney: '',
    bank: '',
    numberDep: '',
    balance: 0,
    money: 0
  }
  constructor(public navCtrl: NavController, private router: Router, 
    private operationService: OperationService,
    private alertController: AlertController,
    private loadingController: LoadingController
    ) { 
  
  }

  ngOnInit() {
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
    if(this.opr.money == 0 || this.opr.numberDep == '' ){
      this.messageController('Todos los campos son obligatorios')
    }else{
      this.addData()
    }
  }

  async addData(){
    this.opr.uid = firebase.auth().currentUser.uid;
    const loading = await this.loadingController.create({
      message : 'Enviando información..'
    });
    await loading.present();

    await this.operationService.add(this.opr);
    loading.dismiss();
    this.goBack()
  }

  goBack(){
    this.router.navigate(['/home/operation'])
  }

  goSettings(){
    this.navCtrl.navigateForward(['config']);    
  }
}
