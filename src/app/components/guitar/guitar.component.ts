import { Component, OnInit} from '@angular/core';
import data  from '../../../assets/data/articles.json';



@Component({
  selector: 'app-guitar',
  templateUrl: './guitar.component.html',
  styleUrls: ['./guitar.component.scss']
})
export class GuitarComponent implements OnInit {
  public articles = data;
  
  constructor() { }

  ngOnInit(): void {
  }
 
}
