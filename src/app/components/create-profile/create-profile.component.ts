import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Profile } from '../../../models/profile.model';
import { Photo } from '../../../models/photo.model';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { profilePic } from 'src/models/profilePic.model';
import { Profiles } from '../../../models/profiles.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
model: Profile = new Profile;
public images: Photo[];
public profilePics: profilePic[];
public profile: Profile[];
public profiles: Profiles[];
user: User;
private isLoggedIn: boolean = false;
userID
downloadUrl;

  constructor(private afs: AngularFirestore, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.auth.user$.subscribe(user => this.user = user);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;


        
        this.afs.collection('photos', ref => ref.where('user', '==', user.uid))
        .valueChanges({ idField: 'fileId' }).pipe(
          map(res => res.map( imgResult => new Photo(imgResult) ))
        ).subscribe(res => this.images = res)

        this.afs.collection('profile-pic', ref => ref.where('uid', '==', this.user.uid))
        .valueChanges({ uid: 'uid' }).pipe(
          map(res => res.map( imgResult => new profilePic(imgResult) ))
        ).subscribe(res => this.profilePics = res);



        this.afs.collection('profile', ref => ref.where('uid', '==', this.user.uid))
        .valueChanges({ uid: 'uid' }).pipe(
          map(res => res.map( imgResult => new Profiles(imgResult) ))
        ).subscribe(res => this.profiles = res);





      } else {
        this.isLoggedIn = false;

        this.afs.collection('photos')
        .valueChanges().pipe(
          map(res => res.map( imgResult => new Photo(imgResult) ))
        ).subscribe(res => this.images = res);
      }
    });
  
  }

onSubmit(profile){

 console.log(profile);
 console.log("hello " + this.user.uid);
 profile.timestamp = `${new Date()}`;
 profile.uid = this.user.uid;
 profile.likes = 0;
 profile.profLikes = 0;
 this.afs.collection('profile').doc(this.user.uid).set(profile);
 this.afs.collection('profile-pic').doc(this.user.uid).set({ "downloadUrl": profile.downloadUrl, "uid": this.user.uid });
 this.router.navigate(['view-profile']);
}
selectPhoto(downloadUrl){
  this.userID = this.user.uid;
  console.log("hello" + this.userID + " " + downloadUrl);
 
  console.log("success!");
   this.auth.user$.subscribe(user => this.user = user);
  this.auth.user$.subscribe(user => { 
    if (user) {
   console.log("success!");
   this.afs.collection('profile-pic').doc(this.user.uid).set({ "downloadUrl": downloadUrl, "uid": this.user.uid });
    }
  })
  }


}
