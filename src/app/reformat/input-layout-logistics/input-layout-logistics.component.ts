import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ReformatService } from '../../Services/reformat.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnSavePopupComponent } from '../../on-save-popup/on-save-popup.component';

export interface PeriodicElement {
  fmrc_rec_len: string;
  fmrc_rec_ind_val: string;
  fmrc_col_count: string;
  fmrc_header_ind: string;
  felg_rec_typ: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {fmrc_rec_ind_val: "", fmrc_rec_len: '', fmrc_col_count: "", fmrc_header_ind: "S", felg_rec_typ:"S"},
  {fmrc_rec_ind_val: "", fmrc_rec_len: '',  fmrc_col_count: "", fmrc_header_ind: "S" ,felg_rec_typ:"S"},
  {fmrc_rec_ind_val: "", fmrc_rec_len: '',  fmrc_col_count: "", fmrc_header_ind: "S",felg_rec_typ:"S"},
  {fmrc_rec_ind_val: "", fmrc_rec_len: '', fmrc_col_count: "", fmrc_header_ind:"S",felg_rec_typ:"S"}
];
@Component({
  selector: 'app-input-layout-logistics',
  templateUrl: './input-layout-logistics.component.html',
  styleUrls: ['./input-layout-logistics.component.css']
})
export class InputLayoutLogisticsComponent implements OnInit {
  new=false;
  formatDetail;
  layoutInfo;
  flfm_cd="";
  flfm_id;
  colors:string[]=["white","white","white"];
  page_heading="";
  range =[];
  recordTypeList=[];
  subjectArea =0;
  displayedColumns: string[] ;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  layoutUpdate;
  constructor(private reformatService: ReformatService,public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(OnSavePopupComponent, {
      data: { status: this.layoutUpdate.status, message: this.layoutUpdate.message, navigate: 'modRefLayoutStr', formatCode:this.flfm_id }
    });
  }
  ngOnInit() {
    this.flfm_id=this.reformatService.serviceData;
    if (this.flfm_id!=undefined){
      this.getFormatRelatedDetails();     
      this.getLayoutScreen() ;
    }
  this.getHeaderTrailer();
  }
  getFormatRelatedDetails() {
    var resp;
    this.reformatService.getFormatRelatedDetails(this.flfm_id).subscribe(
      data => {
        resp = data;
        this.formatDetail = JSON.parse(resp._body);
        this.flfm_cd=this.formatDetail.flfm_cd;
        this.subjectArea=this.formatDetail.flfm_subject_area;
        this.page_heading="Modify Record Summary For "+this.flfm_cd+" Reformat";  
        if(this.formatDetail.flfm_file_typ == "F"){
          if(this.subjectArea==1){
            this.displayedColumns = [ 'fmrc_rec_ind_val','fmrc_rec_len', 'fmrc_col_count', 'fmrc_header_ind','felg_rec_typ','Delete_Record'];//will add more
          }else if(this.subjectArea==4 || this.subjectArea==5 || this.subjectArea==7 || this.subjectArea==8 || this.subjectArea==10 || this.subjectArea==6){
            this.displayedColumns = [ 'fmrc_rec_ind_val','set_space_as_rec_ind', 'fmrc_rec_len', 'fmrc_col_count', 'fmrc_header_ind','felg_rec_typ','Delete_Record'];
          }else{
            this.displayedColumns = [ 'fmrc_rec_ind_val','fmrc_rec_len', 'fmrc_col_count', 'fmrc_header_ind','felg_rec_typ','Delete_Record'];
          }
        }else if(this.formatDetail.flfm_file_typ == "D"){
          if(this.subjectArea==1){
            this.displayedColumns = [ 'fmrc_rec_ind_val', 'fmrc_col_count', 'fmrc_header_ind','felg_rec_typ','Delete_Record'];//add more of medical
          }else if(this.subjectArea==4 || this.subjectArea==5 || this.subjectArea==7 || this.subjectArea==8 || this.subjectArea==10 || this.subjectArea==6){
            this.displayedColumns = [ 'fmrc_rec_ind_val','set_space_as_rec_ind', 'fmrc_col_count', 'fmrc_header_ind','felg_rec_typ','Delete_Record'];
          }else{
            this.displayedColumns = [ 'fmrc_rec_ind_val', 'fmrc_col_count', 'fmrc_header_ind','felg_rec_typ','Delete_Record'];
          }
        }
        this.recordType(this.formatDetail.flfm_subject_area);
      });
  }
  getLayoutScreen(){
    var resp;
    
    this.reformatService.getLayoutScreen(this.flfm_id).subscribe(
      data => {
        resp = data;
        var check=JSON.parse(resp._body);
        check.forEach(element => {
          if(element.fmrc_rec_ind_val==undefined){
            element.fmrc_rec_ind_val='';
          }
          if(element.fmrc_rec_len==undefined){
            element.fmrc_rec_len="";
          }
          if(element.fmrc_col_count==undefined){
            element.fmrc_col_count="";
          }
        });
        if(check.length ==0){
          this.new=true;
          check=[
            {fmrc_rec_ind_val: "", fmrc_rec_len: '', fmrc_col_count: "", fmrc_header_ind: "S", felg_rec_typ:"S"},
            {fmrc_rec_ind_val: "", fmrc_rec_len: '',  fmrc_col_count: "", fmrc_header_ind: "S" ,felg_rec_typ:"S"},
            {fmrc_rec_ind_val: "", fmrc_rec_len: '',  fmrc_col_count: "", fmrc_header_ind: "S",felg_rec_typ:"S"},
            {fmrc_rec_ind_val: "", fmrc_rec_len: '', fmrc_col_count: "", fmrc_header_ind:"S",felg_rec_typ:"S"}
          ];
        }
        this.dataSource = check;
      });
  }
  getHeaderTrailer(){
    var resp;
    this.reformatService.getHeaderTrailer().subscribe(
      data => {
        resp = data;
        this.range = JSON.parse(resp._body);
      });
  }
  recordType(val){
    var resp;
    this.reformatService.recordType(val).subscribe(
      data => {
        resp = data;
        this.recordTypeList = JSON.parse(resp._body);
      });
  }
  saveSecond(){
    if(this.new==false){
      let data={flfm_id:this.flfm_id,layout:this.dataSource,file_elg:this.dataSource}
      var resp;   
      this.reformatService.layoutUpdate(data).subscribe(
        data => {
          resp = data;        
          this.layoutUpdate = JSON.parse(resp._body);
          this.openDialog();
        });
    }
 
  }


  
}
  
  

  


