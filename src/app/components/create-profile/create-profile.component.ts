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
import { FileUploadService } from 'src/services/file-upload.service';



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
key;
fileUploads?: any[];
fireList;
private basePath = '/uploads';
  constructor(private afs: AngularFirestore,
     private auth: AuthService,
      private router: Router, private db: AngularFireDatabase,
      private uploadService: FileUploadService) { }

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
 console.log("Hello USER ID:" + this.user.uid);
 profile.timestamp = `${new Date()}`;
 profile.uid = this.user.uid;
 profile.likes = 0;
 profile.profLikes = 0;
 this.afs.collection('profile').doc(this.user.uid).set(profile);
 console.log("Logging Key: " + profile.downloadUrl);


const itemRef = this.db.object(this.user.uid);
itemRef.update({isProfile: profile.downloadUrl});

 //this.db.object('uploads/'+ profile.key).update({isProfile: true});

 
 this.afs.collection('profile-pic').doc(this.user.uid).set({ "downloadUrl": profile.downloadUrl, "uid": this.user.uid, 'key': profile.downloadUrl});
 this.router.navigate(['view-profile']);
}



selectPhoto(downloadUrl){
  this.auth.user$.subscribe(user => { 
    if (user) {
   console.log("success!");
   this.afs.collection('profile-pic').doc(this.user.uid).set({ "downloadUrl": downloadUrl, "uid": this.user.uid });
  }
  })
  }





}
