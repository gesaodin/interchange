import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';
import { OperationService, Operation } from 'src/app/service/model/operation/operation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transferens',
  templateUrl: './transferens.page.html',
  styleUrls: ['./transferens.page.scss'],
})
export class TransferensPage implements OnInit {

  opr : Operation = {
    uid: '',
    name: '',
    status: false,
    type: '',
    dniTo: '',
    dniFrom: '',
    form: 'TRA',
    createAt: new Date(),
    date: '',
    typeMoney: '',
    bank: '',
    numberDep: '',
    balance: 0,
    money: 0,
    total: 0,
    country: ''
  };
  pipe = new DatePipe('en-US');
  public constructor(private route: ActivatedRoute, 
    private router: Router,
    private operationService: OperationService,
    private alertController: AlertController,
    private loadingController: LoadingController) {
      const date = new Date()
      this.opr.date = this.pipe.transform(date, 'dd/MM/yyyy');
      

      this.operationService.getAll().subscribe( res => {
       
        this.opr.balance = 0.00;
        res.forEach(oper => {
          if(oper.status){
            this.opr.balance += oper.money;
          }
        });
      })
    
  }

  ngOnInit() {
    this.opr.dniTo = this.route.snapshot.params['id'];
    this.opr.name = this.route.snapshot.params['titular'];
    if(this.opr.dniTo == 'null' || this.opr.name == 'null'){
      this.opr.dniTo = ''
      this.opr.name = ''
    }
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
    if(this.opr.dniTo == '' || this.opr.name == ''){
      this.messageController('Debe seleccionar un contacto para realizar la transferencia')
    }else{
      if(this.opr.balance == 0 || this.opr.balance < this.opr.money){
        this.messageController('Saldo insuficiente, realice un deposito y registrelo')
      }else{
        
        this.addData()
      }
    }
  }

  async addData(){
    this.opr.uid = firebase.auth().currentUser.uid;
    
    const loading = await this.loadingController.create({
      message : 'Enviando información..'
    });
    await loading.present();

    await this.operationService.add(this.opr)
    loading.dismiss();
    this.goBack()
  }

  goBack(){
    this.router.navigate(['/home/operation'])
  }

  goContacts(){
    this.router.navigate(['/config/list']) 
  }

}
