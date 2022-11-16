import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})


export class CanvasComponent implements OnInit {
  autoRenew = new FormControl();
  
color ='../../../assets/images/sun.gif';
label ;
  constructor() { }

 



  ngOnInit(): void {
  }


  onChange() {
    console.log(this.autoRenew.value);

    if(this.autoRenew.value == true){
      this.color = '../../../assets/images/cheer.png';
      this.label ='true';
    }else{
      this.color = '../../../assets/images/winner.gif';
      this.label ='false';
    }


  } 


  doSomething(){
    
  }



}
