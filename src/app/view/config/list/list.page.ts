import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ListService, Contact } from 'src/app/service/model/config/list.service';
import { Observable } from 'rxjs';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {



  contacts : Contact[];
  state: false;

 
  constructor(private router: Router, private listService: ListService, 
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController) {
    
  }

  loadAll(){
    this.listService.getAll().subscribe( res => {
      this.contacts = res;
    })
  }
  ngOnInit() {
    this.loadAll();
  }

  goAddContact(){
    this.router.navigate(['config/list/contact/null'])
  }
  
  goBack(){
    this.router.navigate(['config'])
  }
  goOperation(){
    this.router.navigate(['/home/operation'])
  }
}
