import {FormControl} from '@angular/forms';
import { ReformatService } from '../../Services/reformat.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { Component, OnInit,ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { CSVRecord } from '../../CSVModel';  

export interface PeriodicElement2 {
  Header_Trailer_Flag: string;
  Field_Name: string;
  Data_Type: string;
  Format: string;
  Range_Type: string;
  Minimum_Value: string;
  Maximum_Value: string;
  Valid_Value_List: string;
}
const ELEMENT_DATA2: PeriodicElement2[] = [
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" },
  { Header_Trailer_Flag: '', Field_Name: "", Data_Type: "--Select--", Format: "--Select--", Range_Type: "--Select--", Minimum_Value: "", Maximum_Value: "", Valid_Value_List: "--Select--" }
];
export interface PeriodicElement {
  fmrc_rec_len: string;
  fmrc_rec_ind_val: string;
  fmrc_col_count: string;
  fmrc_header_ind: string;
  felg_rec_typ: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {fmrc_rec_ind_val: "", fmrc_rec_len: '1', fmrc_col_count: "", fmrc_header_ind: "S", felg_rec_typ:"S"},
  {fmrc_rec_ind_val: "", fmrc_rec_len: '1',  fmrc_col_count: "", fmrc_header_ind: "S" ,felg_rec_typ:"S"},
  {fmrc_rec_ind_val: "", fmrc_rec_len: '1',  fmrc_col_count: "", fmrc_header_ind: "S",felg_rec_typ:"S"},
  {fmrc_rec_ind_val: "", fmrc_rec_len: '1', fmrc_col_count: "", fmrc_header_ind:"S",felg_rec_typ:"S"}
];

@Component({
  selector: 'app-view-reformat',
  templateUrl: './view-reformat.component.html',
  styleUrls: ['./view-reformat.component.css']
})
export class ViewReformatComponent implements OnInit {

  formatDetail;
  layoutInfo;
  flfm_cd="";
  flfm_id;
  page_heading="";
  range =[];
  recordTypeList=[];
  layoutSubjectArea =0;
  displayedColumns: string[] ;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  layoutUpdate;
  colors: string[] = ["white", "white", "white"];
  carrier: any[];
  selectedCarr = "S";
  subjectArea: any[];
  formatTyp = "S";
  selectedSubjectArea = "S";
  availableFormat: any[];
  fileType: any[];
  delimiter = '';
  selectedAvailableFormat = "S";
  formatName = '';
  userNotes = '';
  fileDetail;
  selectedItems = [];
  layout = [];
  layoutSelected = "S";
  dropdownSettings = {};
  updateResult;
  error = "";
  first=false;
  second=true;
  third=true;
  mainscreen=false;
  range2= ["--Select--", "Range", "Valid", "None"];
  datatype = ["--Select--", "String", "Date", "Number"];
  formatDate= ["--Select--", "MM-DD-YYYY", "DD-MM-YYYY", "YYYY-MM-DD"];
  displayedColumns2: string[];
  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2);
  selection2 = new SelectionModel<PeriodicElement2>(true, []);
  constructor(private reformatService: ReformatService, private router: Router) { }

  ngOnInit() {
    this.page_heading = "View Reformat Information";
    this.getAllCarriers();
    this.getFileType();
    this.getAllCarriersModifyScreen();
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'crcr_id',
      textField: 'crcd_nm',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 8,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }

  getAllCarriersModifyScreen() {
    var resp;
    this.reformatService.getAllCarriersModifyScreen().subscribe(
      data => {
        resp = data;
        this.carrier = JSON.parse(resp._body);
      });
  }
  getAllCarriers() {
    var resp;
    this.reformatService.getAllCarriers().subscribe(
      data => {
        resp = data;
        this.carrier = JSON.parse(resp._body);
      });
  }
  getRelatedSubjectArea(val) {
    this.selectedSubjectArea = "S";
    this.selectedAvailableFormat = "S";
    this.formatName = '';
    this.formatTyp = "S";
    this.selectedItems = [
    ];
    this.layoutSelected = "S",
      this.userNotes = '';
    var resp;
    this.reformatService.getRelatedSubjectArea(val).subscribe(
      data => {
        resp = data;
        this.subjectArea = JSON.parse(resp._body);
      });
  }
  getAvaiableFormat(val) {
    this.selectedAvailableFormat = "S";
    this.formatName = '';
    this.formatTyp = "S"
    this.selectedItems = [
    ];
    this.layoutSelected = "S",
      this.userNotes = '';
    var obj = { "carrier": this.selectedCarr, "subjArea": val }
    var resp;
    this.reformatService.getAvailableFormat(obj).subscribe(
      data => {
        resp = data;
        this.availableFormat = JSON.parse(resp._body);
      });
    this.reformatService.getLayoutDetails(val).subscribe(
      data => {
        resp = data;
        this.layout = JSON.parse(resp._body);
      });
  }
  getFileType() {
    var resp;
    this.reformatService.getFileType().subscribe(
      data => {
        resp = data;
        this.fileType = JSON.parse(resp._body);
      });
  }
  getFormatRelatedDetails(val) {
    var resp;
    this.formatName = '';
    this.layoutSelected = "S",
      this.formatTyp = "S";
    this.userNotes = '';
    this.selectedCarrierList(val);
    this.reformatService.getFormatRelatedDetails(val).subscribe(
      data => {
        resp = data;
        this.fileDetail = JSON.parse(resp._body);
        this.formatName = this.fileDetail.flfm_nm;
        if (this.fileDetail.usnt_notes != undefined) {
          this.userNotes = this.fileDetail.usnt_notes
        }
        if (this.fileDetail.flfm_file_typ != undefined) {
          this.formatTyp = this.fileDetail.flfm_file_typ;
        }
        if (this.fileDetail.flfm_layout_typ != undefined) {
          this.layoutSelected = this.fileDetail.flfm_layout_typ
        }
      });

  }
  selectedCarrierList(val) {
    var resp;
    this.reformatService.selectedCarrierList(val).subscribe(
      data => {
        resp = data;
        this.selectedItems = JSON.parse(resp._body);
      });
  }
  nextFirst() {
      this.first=true;
      this.second=false;
      this.flfm_id=this.selectedAvailableFormat;
      this.getHeaderTrailer();
      this.getFormatInfoForLayout();
      this.getLayoutScreen();
      this.displayedColumns = [ 'fmrc_rec_ind_val','fmrc_rec_len', 'fmrc_col_count', 'fmrc_header_ind','felg_rec_typ','Delete_Record']
  }
  getFormatInfoForLayout() {
    var resp;
    this.reformatService.getFormatRelatedDetails(this.flfm_id).subscribe(
      data => {
        resp = data;
        this.formatDetail = JSON.parse(resp._body);
        this.flfm_cd=this.formatDetail.flfm_cd;
        this.layoutSubjectArea=this.formatDetail.flfm_subject_area;
        this.page_heading="View Record Summary For "+this.flfm_cd+" Reformat";  
        if(this.formatDetail.flfm_file_typ == "F"){
          if(this.layoutSubjectArea==1){
            this.displayedColumns = [ 'fmrc_rec_ind_val','fmrc_rec_len', 'fmrc_col_count', 'fmrc_header_ind','felg_rec_typ','Delete_Record'];//will add more
          }else if(this.layoutSubjectArea==4 || this.layoutSubjectArea==5 || this.layoutSubjectArea==7 || this.layoutSubjectArea==8 || this.layoutSubjectArea==10 || this.layoutSubjectArea==6){
            this.displayedColumns = [ 'fmrc_rec_ind_val','set_space_as_rec_ind', 'fmrc_rec_len', 'fmrc_col_count', 'fmrc_header_ind','felg_rec_typ','Delete_Record'];
          }else{
            this.displayedColumns = [ 'fmrc_rec_ind_val','fmrc_rec_len', 'fmrc_col_count', 'fmrc_header_ind','felg_rec_typ','Delete_Record'];
          }
        }else if(this.formatDetail.flfm_file_typ == "D"){
          if(this.layoutSubjectArea==1){
            this.displayedColumns = [ 'fmrc_rec_ind_val', 'fmrc_col_count', 'fmrc_header_ind','felg_rec_typ','Delete_Record'];//add more of medical
          }else if(this.layoutSubjectArea==4 || this.layoutSubjectArea==5 || this.layoutSubjectArea==7 || this.layoutSubjectArea==8 || this.layoutSubjectArea==10 || this.layoutSubjectArea==6){
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
  nextSecond(){
    this.first=true;
    this.second=true;
    this.third=false;
    this.flfm_id = this.reformatService.serviceData;
    this.displayedColumns2 = ['Header_Trailer_Flag', 'Field_Name', 'Data_Type', 'Format', 'Record_Type_Ind', 'File_Enclosed', 'Range_Type', 'Minimum_Value', 'Maximum_Value', 'Valid_Value_List'];

  }



}
