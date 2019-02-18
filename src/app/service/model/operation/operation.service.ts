import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { reject } from 'q';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';


export interface Operation{
  uid: string
  name: string
  status: boolean
  type: string
  dniTo: string
  dniFrom: string
  createAt: Date
  date: string
  form?: string
  typeMoney: string
  bank: string
  numberDep: string
  balance: number
  money: number
  total?: number
  country?: string
}

export interface Descripcion{
  nombre:string
  rif: string
  direccion?: string
}

export interface Admin{
  uid: string
  nombre: string
  mail: string
}

export interface User{
  uid: string
  nombre: string
  mail: string
}

export interface Container{
  dimesion: string
  descri: string
  numero: string
}

export interface Empresa{
  usuario: User
  container: Container[]
}

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  currentUser = firebase.auth().currentUser.uid;
  constructor(private afs: AngularFirestore) { }

  
  getAll(): Observable<Operation[]>{
    const deposit : AngularFirestoreCollection<Operation> = this.afs.collection('client')
    .doc(this.currentUser).collection<Operation>('operations');
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
  
  getID(id : string): Observable<Operation>{
    const doc : AngularFirestoreDocument<Operation> = this.afs.collection('client')
    .doc(this.currentUser).collection('operations').doc(id)
    return doc.valueChanges();   
  }

  async add(operation: Operation): Promise<void>{
    return await new Promise<any>((resolve, reject) => {      
      this.afs.collection('client').doc(this.currentUser).collection('operations').add(operation)
      .then(        
        res => { 
          var oper = 'transferens'
          if(operation.form == 'DEP')  oper = 'deposit'
          this.afs.collection(oper).doc(res.id).set(operation).then(
            res => resolve(res),
            err => reject(err)
          )
          resolve(res) 
        },
        err => reject(err)
      )
    })    
  }

  async addEmpresaDescripcion(des : Descripcion): Promise<void>{
    return await new Promise<any>((resolve, reject) => {
      this.afs.collection('empresa').doc<Descripcion>('descripcion').set(des).then(
        res=> resolve(true),
        err => reject(false)
      )
    })
  }

  getEmpresDes( ): Observable<Descripcion>{
    const doc : AngularFirestoreDocument<Descripcion> = this.afs.collection('empresa')
    .doc('descripcion')
    return doc.valueChanges();
  }


}
