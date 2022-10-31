import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';





@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  panelOpenState = false;

public links: Array<any> = [
     { src: "../../../assets/data/myResume-IT Specialist.pdf"},
  ];
name;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


onSubmit(){

}

showInfo(link){
   console.log(link);
}





}




