import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Fly{
  uid: string
  today? : Date
  fromDate: string
  toDate: string
  origen: string
  destino: string
  status: boolean
}

@Injectable({
  providedIn: 'root'
})
export class FlyService {

  currentUser = firebase.auth().currentUser.uid;
  constructor(private afs: AngularFirestore) { }
  getAll(): Observable<Fly[]>{
    const deposit : AngularFirestoreCollection<Fly> = this.afs.collection('client')
    .doc(this.currentUser).collection<Fly>('flys');
    return deposit.snapshotChanges().pipe(
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      })
    )
  }
  
  getID(id : string): Observable<Fly>{
    const doc : AngularFirestoreDocument<Fly> = this.afs.collection('client')
    .doc(this.currentUser).collection('flys').doc(id)
    return doc.valueChanges();   
  }

  async add(fly: Fly): Promise<void>{
    return await new Promise<any>((resolve, reject) => {      
      this.afs.collection('client').doc(this.currentUser).collection('flys').add(fly)
      .then(        
        res => {           
          this.afs.collection('flys').doc(res.id).set(fly).then(
            res => resolve(res),
            err => reject(err)
          )
          resolve(res) 
        },
        err => reject(err)
      )
    })    
  }

}
