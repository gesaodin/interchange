import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankService, Bank } from 'src/app/service/model/config/bank.service';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.page.html',
  styleUrls: ['./bank.page.scss'],
})
export class BankPage implements OnInit {
  banks = [];
  
  bank : Bank = { };

  
  constructor( private router: Router, private bankService: BankService, private loading: LoadingController) {     
    this.banks = [
      {'desc': 'Banesco', 'code': '0134'},
      {'desc': 'Bod', 'code': '0102'},
      {'desc': 'Mercantil', 'code': '0105'},
      {'desc': 'Provincial', 'code': '0108'},
      {'desc': 'Venezuela', 'code': '0102'}
    ];
    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //  });
    this.loadingData()
  }

  async loadingData(){
    const loading = await this.loading.create({
      message : 'Cargando Datos...'
    });
    await loading.present();
     
    await this.bankService.getID().subscribe((bank) => {
      if(bank){
        this.bank.code = bank.code
        this.bank.name = bank.name
        this.bank.type = bank.type
        this.bank.number = bank.number        
        this.bank.money = bank.money 
        this.bank.titular = bank.titular
      }
    });
    loading.dismiss();
  }

  async addData(){
    const loading = await this.loading.create({
      message : 'Enviando información..'
    });
    await loading.present();

    await this.bankService.add(this.bank);
    loading.dismiss();
  }
  onClick() {
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   console.log(resp);
    // }).catch((error) => {  
    //   console.log('Error getting location', error);
    // });
  }

  goBack(){
    this.router.navigate(['config'])
  }
  ngOnInit() {
  }

}
