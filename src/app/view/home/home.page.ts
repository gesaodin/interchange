import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  
  }
  logout(){
    this.router.navigate(['login']);
  }
  ngOnInit() {
  }

}



  

