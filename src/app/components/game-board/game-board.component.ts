import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardData } from './card-data.model';
import { GameRestartDialogComponent } from '../game-restart-dialog/game-restart-dialog.component';

import { map } from 'rxjs/operators';
import { Photo } from '../../../models/photo.model';
import { AuthService } from '../../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../../models/user';





@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  

  cardImages = [
    'pDGNBK9A0sk',
    'fYDrhbVlV1E',
    'qoXgaF27zBc',
    'b9drVB7xIOI',
    'fuck',
    'TQ-q5WAVHj0'
  ];

  cards: CardData[] = [];

  flippedCards: CardData[] = [];

  matchedCount = 0;

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  public images: Photo[];
  private isLoggedIn: boolean = false;

  user: User;

  numCards;

  constructor(private dialog: MatDialog,private auth: AuthService, private afs: AngularFirestore) {

  }

  ngOnInit(): void {
    this.cards = [];

    this.auth.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;

       


          this.afs.collection('photos', ref => ref.where('user', '==', user.uid))
          .valueChanges({ idField: 'fileId' }).pipe(
            map(res => res.map( imgResult => new Photo(imgResult) ))
          ).subscribe(res => 
  

       
          res.forEach((image) => {
           
            const cardData: CardData = {
              imageId: image.downloadUrl,
              state: 'default'
            };


            this.cards.push({ ...cardData });
            this.cards.push({ ...cardData });
            this.numCards = this.cards.length;
         
            this.cards = this.shuffleArray(this.cards);
          })

        );


       
      } else {
        this.isLoggedIn = false;

        this.afs.collection('photos')
        .valueChanges().pipe(
          map(res => res.map( imgResult => new Photo(imgResult) ))
        ).subscribe(res => this.images = res);
      }
    });

  
  }

  
  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        console.log(this.flippedCards.length);
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;
    
        console.log("Match Count:::" + this.matchedCount);
        console.log("matches remain" + this.numCards);
        if (this.matchedCount * 2 === this.numCards) {
          const dialogRef = this.dialog.open(GameRestartDialogComponent, {
            disableClose: true
            
          });

          dialogRef.afterClosed().subscribe(() => {

            this.restart();
          });
        }
      }

    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
   this.ngOnInit();
  }

}
