import { ClientServiceService } from '../../Services/client-service.service';
import { Component } from '@angular/core';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})

export class ViewClientComponent {
  colors: string[] = ["white", "white", "white"];
  page_heading = "View Client Profile";
  selectedEngagementType = '';
  clients: any[];
  selectedCd = '';
  selectedStatus;
  retroMonth = '';
  selectedId;
  clientDetails;
  coverageList: string[];
  selectedList: string[];
  scrambleDetl = [];
  displayedColumns: string[] = ['source', 'mappxi', 'rembyte'];

  constructor(private clientService: ClientServiceService) { }

  ngOnInit() {
    this.selectedEngagementType = '0';
    this.getClients();
  }
  getClients() {
    var resp;
    this.clientService.getClients().subscribe(
      data => {
        resp = data;
        this.clients = JSON.parse(resp._body);
      });
  }
  getAllClientDetails(val) {
    var resp;
    this.selectedCd = val;
    this.clientService.getAllClientDetails(val).subscribe(
      data => {
        resp = data;
        this.clientDetails = JSON.parse(resp._body);
        this.selectedId = this.clientDetails.cmcm_id;
        this.retroMonth = this.clientDetails.clpq_retroact_mon;
        this.selectedStatus = this.clientDetails.clpq_retroact_ind;
        if (this.clientDetails.cmcm_engmnt_typ == 1) {
          this.selectedEngagementType = '1';
        } else if (this.clientDetails.cmcm_engmnt_typ == 2) {
          this.selectedEngagementType = '2';
        } else {
          this.selectedEngagementType = '0';
        }
        this.getAllClientCoverage();
        this.getAllSelectedCoverage(this.selectedId);
        this.getScrambleInfo(this.selectedId);
      });

  }
  getAllClientCoverage() {
    var resp;
    this.clientService.getAllClientCoverage().subscribe(
      data => {
        resp = data;
        this.coverageList = JSON.parse(resp._body);
      });
  }
  getAllSelectedCoverage(selectedID) {
    var resp;
    this.clientService.getAllSelectedCoverage(selectedID).subscribe(
      data => {
        resp = data;
        this.selectedList = JSON.parse(resp._body);
      });
  }
  getScrambleInfo(selectedID) {
    var resp;
    this.clientService.getScrambleInfo(selectedID).subscribe(
      data => {
        resp = data;
        this.scrambleDetl = JSON.parse(resp._body);
        console.log(this.scrambleDetl);
      });
  }

}





