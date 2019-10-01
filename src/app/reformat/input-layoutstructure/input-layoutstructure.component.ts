import { Component, OnInit,ViewChild  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReformatService } from '../../Services/reformat.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CSVRecord } from '../../CSVModel';  

export interface PeriodicElement {
  Header_Trailer_Flag: string;
  Field_Name: string;
  Data_Type: string;
  Format: string;
  Range_Type: string;
  Minimum_Value: string;
  Maximum_Value: string;
  Valid_Value_List: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
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
@Component({
  selector: 'app-input-layoutstructure',
  templateUrl: './input-layoutstructure.component.html',
  styleUrls: ['./input-layoutstructure.component.css']
})
export class InputLayoutstructureComponent implements OnInit {
  flfm_id;
  mainscreen=false;
  colors: string[] = ["white", "white", "white"];
  page_heading = "Input Layout Structure";
  range = ["--Select--", "Range", "Valid", "None"];
  datatype = ["--Select--", "String", "Date", "Number"];
  formatDate= ["--Select--", "MM-DD-YYYY", "DD-MM-YYYY", "YYYY-MM-DD"];
  displayedColumns: string[];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  layoutUpdate;
  constructor(private reformatService: ReformatService, private router: Router) { }

  ngOnInit() {
    this.flfm_id = this.reformatService.serviceData;
    this.displayedColumns = ['Header_Trailer_Flag', 'Field_Name', 'Data_Type', 'Format', 'Record_Type_Ind', 'File_Enclosed', 'Range_Type', 'Minimum_Value', 'Maximum_Value', 'Valid_Value_List'];

  }

  public records: any[] = [];  
  @ViewChild('csvReader') csvReader: any;  
  
  uploadListener($event: any): void {  
    this.mainscreen=true;
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
        console.log(this.records)
        console.log(this.dataSource)
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        csvRecord.Field_Name = curruntRecord[0].trim();  
        csvRecord.Data_Type = curruntRecord[1].trim();  
        csvRecord.Format = curruntRecord[2].trim();  
        csvRecord.Record_Type_Ind = curruntRecord[3].trim();  
        csvRecord.Quotes = curruntRecord[4].trim(); 
        csvRecord.Range_Type = curruntRecord[5].trim();   
        csvRecord.Minimum_Value = curruntRecord[6].trim();
        csvRecord.Maximum_Value = curruntRecord[7].trim();
        csvRecord.Valid_Value_List = curruntRecord[8].trim();

        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }  
} 



