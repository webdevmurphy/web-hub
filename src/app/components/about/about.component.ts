import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})


export class AboutComponent implements OnInit {

public links: Array<any> = [
     { src: "../../../assets/data/myResume-IT Specialist.pdf"},
  ];
name;
  constructor() { }

  ngOnInit(): void {
  }


onSubmit(){

}

showInfo(link){
   console.log(link);
}


openDialog(){

}



}
