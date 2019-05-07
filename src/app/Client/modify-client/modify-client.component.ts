import { ClientServiceService } from '../../Services/client-service.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-modify-client',
  templateUrl: './modify-client.component.html',
  styleUrls: ['./modify-client.component.css']
})
export class ModifyClientComponent {
  colors: string[] = ["white", "white", "white"];
  page_heading = "Modify Client Profile";
  selectedEngagementType = '';
  clients: any[];
  selectedId = '';
  clientDetails;
  coverageDetail = new FormControl();
  coverageList: string[];

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
    this.selectedId = val;
    this.clientService.getAllClientDetails(val).subscribe(
      data => {
        resp = data;
        this.clientDetails = JSON.parse(resp._body);
        if (this.clientDetails.cmcm_engmnt_typ == 1) {
          this.selectedEngagementType = '1';
        } else if (this.clientDetails.cmcm_engmnt_typ == 2) {
          this.selectedEngagementType = '2';
        } else {
          this.selectedEngagementType = '0';
        }
      });
      this.getAllClientCoverage();

  }
  getAllClientCoverage(){
    var resp;
    this.clientService.getAllClientCoverage().subscribe(
      data => {
        resp = data;
        this.coverageList = JSON.parse(resp._body);
        console.log(this.coverageList);
      });
  }
}
