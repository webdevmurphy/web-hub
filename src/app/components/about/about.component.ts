import { Component, OnInit } from '@angular/core';



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
