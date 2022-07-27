import { Component, OnInit } from '@angular/core';
import { Profiles } from '../../../models/profiles.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../../services/auth.service';
import { map } from 'rxjs/operators';
import { User } from '../../../models/user';



@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  public profiles: Profiles[];
  user: User;
  private isLoggedIn: boolean = false;


  constructor(private afs: AngularFirestore,private auth: AuthService ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;


        
    



        this.afs.collection('profile', ref => ref.where('uid', '==', this.user.uid))
        .valueChanges({ uid: 'uid' }).pipe(
          map(res => res.map( imgResult => new Profiles(imgResult) ))
        ).subscribe(res => this.profiles = res);





      } else {
        this.isLoggedIn = false;

       
      }
    });


  }

}
