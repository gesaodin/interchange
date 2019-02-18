import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dolar',
  templateUrl: './dolar.page.html',
  styleUrls: ['./dolar.page.scss'],
})
export class DolarPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  goBack(){
    this.navCtrl.navigateBack(['/home/operation']);
  }
  goSettings(){
    this.navCtrl.navigateForward(['config']);    
  }
}
