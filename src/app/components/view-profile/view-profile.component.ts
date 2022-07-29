import { Component, OnInit } from '@angular/core';
import { Profiles } from '../../../models/profiles.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../../services/auth.service';
import { map } from 'rxjs/operators';
import { User } from '../../../models/user';

import { Profile } from 'src/models/profile.model';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  public profiles: Profiles[];
  public profile: Profile[];
  user: User;
  private isLoggedIn: boolean = false;
  files: string[];
  clicked = false;
  likes;

  profLikes: string[];

  constructor(private afs: AngularFirestore,private auth: AuthService) { }

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

   this.files = new Array<string>();
  }


  likeClick(profiles){
    
     console.log("Number of likes is: " + profiles.likes);
     this.likes = profiles.likes;
     this.files.push(this.user.uid);
     this.likes++;
     
      //this.afs.collection('profile').doc(this.user.uid).update({profLikes: this.files});
      this.afs.collection('profile').doc(this.user.uid).update({likes: this.likes});

  }


  dislikeClick(profiles){

   this.likes = profiles.likes;

    if(this.likes <= 0 ){
      this.likes = 0;
    } else {
      this.likes--;
      this.afs.collection('profile').doc(this.user.uid).update({likes: this.likes});

    }

  }


  

}
