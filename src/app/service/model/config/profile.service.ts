import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

export interface Profile{
  cod: string,
  dni: string,
  user : string,
  firstname : string,
  lastname: string,
  phone : string,
  email: string,
  reside: string
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  currentUser = firebase.auth().currentUser.uid;

  constructor(private afs: AngularFirestore) { 
    

  }

  getID(): Observable<Profile>{
    const doc : AngularFirestoreDocument<Profile> = this.afs.collection('client').doc(this.currentUser).collection('user').doc<Profile>('profile');
    return doc.valueChanges();   
  }

  add(profile: Profile): Promise<void>{
    return new Promise<any>((resolve, reject) => {      
      this.afs.collection('client').doc(this.currentUser).collection('user').doc('profile').set(profile)
      .then(  
        res => resolve(res),
        err => reject(err)
      )
    })    
  }

  //Delete User Conect
  del(id){

  } 


}
