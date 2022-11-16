import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CarouselComponent } from '../carousel/carousel.component';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  autoRenew = new FormControl();
  
  color ='../../../assets/images/sun.gif';
  label ;
  


  constructor(public auth: AuthService, public dialog: MatDialog) { }

  user;

  ngOnInit(): void {
  }


  onChange() {
    console.log(this.autoRenew.value);

    if(this.autoRenew.value == true){
      this.color = '../../../assets/images/cheer.png';
      this.label ='I love you !';
    }else{
      this.color = '../../../assets/images/winner.gif';
      this.label ='you are amazing!';
    }
  } 

}
