import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ReformatService } from '../../Services/reformat.service';

@Component({
  selector: 'app-copy-reformat',
  templateUrl: './copy-reformat.component.html',
  styleUrls: ['./copy-reformat.component.css']
})
export class CopyReformatComponent implements OnInit {
  colors:string[]=["white","white","white"];
  page_heading="Copy Reformat Information";
  carrier: any[];
  selectedCarr;
  subjectArea: any[];
  selectedSubjectArea;
  availableFormat: any[];
  selectedAvailableFormat;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(private reformatService: ReformatService) { }

  ngOnInit() {
    this.getAllCarriers();
  }
  getAllCarriers(){
    var resp;
    this.reformatService.getAllCarriers().subscribe(
      data => {
        resp = data;
        this.carrier = JSON.parse(resp._body);
      });
  }
  getRelatedSubjectArea(val){
    var resp;
    this.reformatService.getRelatedSubjectArea(val).subscribe(
      data => {
        resp = data;
         this.subjectArea = JSON.parse(resp._body);     
      });
  }
  getAvaiableFormat(val){
    var obj={"carrier":this.selectedCarr, "subjArea":val} 
    var resp;
    this.reformatService.getAvailableFormat(obj).subscribe(
      data => {
        resp = data;
         this.availableFormat = JSON.parse(resp._body);     
      }); 
  }
}
