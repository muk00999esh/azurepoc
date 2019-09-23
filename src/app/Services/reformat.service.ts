import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class ReformatService {
  url = 'http://localhost:4000/api'

  constructor(private http: Http) { }
    serviceData: string;
  
  // Copy|Add Reformat screen
  getAllCarriers() {
    return this.http.get(`${this.url}/formatScreen/carrier`);
  }

  // Copy Reformat screen
  getRelatedSubjectArea(val) {
    return this.http.get(`${this.url}/formatScreen/subjectArea/` + val);
  }
  // Copy|Modify Reformat screen
  getAvailableFormat(carr_sub) {
    return this.http.post(`${this.url}/formatScreen/availableFormat`, carr_sub);
  }

  getLayoutDetails(subj) {
    return this.http.post(`${this.url}/formatScreen/layoutDetails`, { "subject_area": subj });
  }
  //Add Reformat Screen
  getAllSubjectArea() {
    return this.http.get(`${this.url}/addformatScreen/subjectArea`);
  }
  createNewReformat(createObject) {
    return this.http.post(`${this.url}/addformatScreen/createNewReformat`, createObject);
  }

  //Modify Reformat screent 
  getAllCarriersModifyScreen() {
    return this.http.get(`${this.url}/modifyformatScreen/carriers`);
  }

  getFileType() {
    return this.http.get(`${this.url}/reformat/fileType`);
  }
  getFormatRelatedDetails(id) {
    return this.http.post(`${this.url}/reformat/allRelatedFileDetail`, { "flfm_id": id });
  }
  selectedCarrierList(id) {
    return this.http.post(`${this.url}/reformatScreen/selectedCarriers`, { "flfm_id": id });
  }
  submitUpdate(obj){
    return this.http.put(`${this.url}/updateReformat`,obj);
  }
  getLayoutScreen(id){
    return this.http.post(`${this.url}/modifyReformat/inputLayout`, { "flfm_id": id });
  }
  getHeaderTrailer(){
    return this.http.get(`${this.url}/inputLayout/headerTrailer`);
  }
  recordType(sub){
    return this.http.post(`${this.url}/inputLayout/recordType`,{"flfm_subject_area":sub});
  }
layoutUpdate(data){
  return this.http.post(`${this.url}/modifyReformat/inputLayoutUpdate`, { "data": data });
}
}
