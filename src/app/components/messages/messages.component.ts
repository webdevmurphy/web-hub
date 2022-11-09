import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import * as firestore from 'firebase/firestore';
import 'firebase/firestore';
import { map } from 'rxjs/operators';
import { profilePic } from '../../../models/profilePic.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  user: User;
  online:Observable<any[]>
  posts:Observable<any[]>
  public profilePics: profilePic[];
  arrived;
  private isLoggedIn: boolean = false;
  index = 0;

  title: string = "Chat";
  content: string;
  downloadUrl: string;
  author = "your name here";
  position = 'top-right';
  status = 'control';
  message ="new chat message";
  heroes = [];
  myVar;
  constructor(
    private afs: AngularFirestore, 
    public auth: AuthService,
    private db: AngularFireDatabase ) { }
 
  ngOnInit(): void {
    this.online = this.afs.collection('online', ref => ref.orderBy('name', 'desc').limit(25)).valueChanges();
    this.posts = this.afs.collection('posts', ref => ref.orderBy('timeStamp', 'desc').limit(10)).valueChanges();
    this.auth.user$.subscribe(user => this.user = user);
    //play audio on away
   //  this.arrived = this.afs.collection('online', ref => ref.orderBy('name', 'desc').limit(25)).valueChanges().subscribe(data => this.playAudio2(data));
    this.afs.collection('posts', ref => ref.orderBy('timeStamp', 'desc').limit(25)).valueChanges().subscribe();
  

    this.auth.user$.subscribe(user => this.user = user);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
       
        this.afs.collection('profile-pic', ref => ref.where('uid', '==', this.user.uid))
        .valueChanges({ uid: 'uid' }).pipe(
          map(res => res.map( imgResult => new profilePic(imgResult) ))
        ).subscribe(res => this.profilePics = res);

        this.db.list(this.user.uid).snapshotChanges().subscribe(result => {
          this.myVar =   result[0].payload.val();
        
            console.log(result[0].payload.val());
          })
        

      } else {
        this.isLoggedIn = false;



        this.afs.collection('profile-pic', ref => ref.where('uid', '==', 'uid'))
        .valueChanges({ uid: 'uid' }).pipe(
          map(res => res.map( imgResult => new profilePic(imgResult) ))
        ).subscribe(res => this.profilePics = res);

           


      }
    });
    
  }
  
  addPost() {
    this.afs.collection('posts').add({
    'timeStamp': firestore.Timestamp.now(),
    'title': this.user.displayName,
    'author': this.author, 
    'downloadUrl': this.profilePics[0].downloadUrl,
    'content': this.content});
     this.sendMessage();
  }
  
  sendMessage() {
    // After Sending Message
   this.title ='';
   this.content= '';
  }

  addHero(newHero: string) {
    if (newHero) {
      this.heroes.push(newHero);
      this.addPost();
    }
  }

  playAudio(audioinc){
    console.log(this.index + " this is index");
    this.index++;
    if(audioinc && this.index >= 1){
    let audio = new Audio();
    audio.src = "../../../assets/audio/mssgIn2.mp3";
    audio.load();
    audio.play();
  }
  }
  
  playAudio2(audioinc2){
    this.index++;
    if(audioinc2 && this.index >= 1){
    let audio = new Audio();
    audio.src = "../../../assets/audio/welcomeuser.mp3";
    audio.load();
    audio.play();
  }
  }

  onSubmit(){

  }



}

