import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DbResult } from '../../models/dbresult.model';
import { User } from '../../models/user.model';
import { MasterData } from '../../models/master.data.model';
import { IuserService } from '../../services/iuser.service';
import { Router } from '@angular/router';
import { IMasterDataService } from '../../services/imaster.data.service';
import { MasterType } from '../../models/master.type.model';
import { RequestParms } from '../../models/requestParms';

declare var $: any;

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrl: './master-data.component.css'
})
export class MasterDataComponent  implements OnInit, OnDestroy {
  masterDatas: MasterData[] = [];
  masterData: MasterData = new MasterData();
  masterTypes: MasterType[]=[];
  masterType:string="";
  requestParms : RequestParms =new RequestParms()
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  private subscription: Subscription = new Subscription();
  dtOptions: any ={};
  dtTrigger:Subject<any>=new Subject<any>();

  constructor(private iuserService: IuserService, private imasterDataService: IMasterDataService,private router: Router) { 

    this.currentUser = iuserService.getCurrentUser();
    if(this.currentUser.u_id==0) { 
      this.router.navigate(['login']);
    }
    
    
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers', // Shows full pagination controls with "First", "Previous", "Next", and "Last"
      pageLength: 10,
      lengthMenu: [10, 25, 50, 100], // Allows users to select the number of records per page
      dom: '<"row"<"col-sm-12 col-md-6 text-left"l><"col-sm-12 col-md-6 text-right"f>>' +
           't<' +
           '"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
      responsive: true, // Ensures that the table adjusts for small screens
    };
    
    this.LoadMasterTypes();
    this.subscription.add(
      this.imasterDataService.refreshMasterDatas$.subscribe(() => {
        this.getMasterDatasByType();
      })
    );
    
  }


  LoadMasterTypes(): void {
    this.imasterDataService.getMasterDataTypes().subscribe(
      (data: MasterType[]) => {
        this.masterTypes = data;
        if (this.masterTypes.length > 0) {
          this.masterType = this.masterTypes[0].type;
          this.getMasterDatasByType();
        }
      },
      (error: any) => {
        console.error('Error fetching menu type', error);
        
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  loadMasterDatas(): void {
    this.imasterDataService.getMasterDatas().subscribe(
      (data: MasterData[]) => {
        this.masterDatas = data;
        this.dtTrigger.next(null);
      },
      (error: any) => {
        console.error('Error fetching masterDatas', error);
      }
    );
  }

  createOrUpdateMasterData(): void {
    this.masterData.md_cre_by = this.currentUser.u_id;
    this.imasterDataService.createOrUpdateMasterData(this.masterData).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.imasterDataService.refreshMasterDatas();
          this.removeDatatable();
          $('#masterDataFormModal').modal('hide');
      
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
        console.error('Error creating/updating masterData', error);
        alert('An error occurred while creating/updating the masterData.');
      }
    );
  }

  deleteMasterData(id: number): void {
    this.imasterDataService.deleteMasterData(id).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (this.dbResult.message === "Success") {
          this.masterDatas = this.masterDatas.filter(masterData => masterData.md_id !== id);
          this.imasterDataService.refreshMasterDatas();
          this.removeDatatable();     
          alert("Successfully Removed");
        } else {
          alert(this.dbResult.message);
        }
      },
      (error: any) => {
        console.error('Error deleting masterData', error);
      }
    );
  }
  

  editMasterData(id: number): void {
    this.imasterDataService.getMasterData(id).subscribe(
      (data: MasterData) => {
        this.masterData = data;
        
        $('#masterDataFormModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching masterData', error);
      }
    );
  }

  createMasterData(): void {
    this.masterData = new MasterData();
    this.masterData.md_type=this.masterType;
    $('#masterDataFormModal').modal('show');
  }
  removeDatatable(){
    if ($.fn.dataTable.isDataTable('#DataTables_Table_0')) {
      $('#DataTables_Table_0').DataTable().clear().destroy();
    }
  }
  onOptionChange(option :any){
    this.masterType=option;
    this.getMasterDatasByType();
  }

  getMasterDatasByType(): void {
    this.requestParms.type=this.masterType;
    this.imasterDataService.getMasterDatasByType(this.requestParms).subscribe(
      (data: MasterData[]) => {
        this.masterDatas = data;
        this.removeDatatable();
        this.dtTrigger.next(null);
      },
      (error: any) => {
        console.error('Error fetching menu type', error);
        
      }
    );
  }

}
