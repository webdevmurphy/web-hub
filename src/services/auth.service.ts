import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
//import { auth } from 'firebase';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, of } from "rxjs";
import { AngularFirestoreDocument, AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { map, switchMap, first, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { of as observableOf } from 'rxjs';
import firebase from "firebase/compat/app";
import {GoogleAuthProvider} from 'firebase/auth';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  online: Observable<any[]>;

  user$: Observable<User>;

  

  
  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        console.log("this is none");
        return null;
      } else {
        console.log(authState.uid);
        return authState.uid;
       
      }
    })
  );


  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private db: AngularFireDatabase,
  ) {
    console.log('let there be presence');
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
    this.updateOnAway();

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {

          return of(null);
        }
      }));
  }

 

  googleLogin() {
    const provider = new GoogleAuthProvider();
    
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
   

    return this.afAuth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
     
  }

 async signOut() {
    const user = await this.getUser();
    
    this.setPresence('offline');

    this.afAuth.signOut();
   
    return this.router.navigate(['/']);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        admin: false
      }
     
    }
    return userRef.set(data, { merge: true })
  };
  

  //wraping  db observable so we can listen to status based on uid
  getPresence(uid: string) {
    console.log("UID: " + uid);
    return this.db.object(`${uid}`).valueChanges();
  }
  
  //return as as promise so you can use async await 
  getUser() {
   
    return firstValueFrom(this.afAuth.authState);
  }


 async setPresence(status: string) {
    const user = await this.getUser();
    
    if (user) {
     
      return this.db.object(`status/${user.uid}`).update({ status, timestamp: this.timestamp });
    }
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  //return boolean if device is connected
  updateOnUser() {
      const connection = this.db.object('.info/connected').valueChanges().pipe(
      map(connected => connected ? 'online' : 'offline')
    );
 //if logged in reaturn the observable or say they are offline
 
    return this.afAuth.authState.pipe(
      
      switchMap(user =>  user ? connection : of('offline')),
      //updateit in the db
      tap(status => this.setPresence(status))
    );

    
  }


  updateOnDisconnect() {
    return this.afAuth.authState.pipe(
      tap(user => {
        if (user) {
          this.db.object(`status/${user.uid}`).query.ref.onDisconnect()
            .update({
              status: 'offline',
              timestamp: this.timestamp
          });
        }
      })
    );
  }



updateOnAway() {
  document.onvisibilitychange = (e) => {

    if (document.visibilityState === 'hidden') {
      this.setPresence('away');

    } else {
      this.setPresence('online');
    }
  };
}




testUpdate(status){
  const user = this.getUser();
   if(user){

   }
}


}


