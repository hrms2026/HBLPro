import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { IuserService } from '../../services/iuser.service';
import { IMachineService } from '../../services/imachine.service';
import { Machine } from '../../models/machine.model';
import { DbResult } from '../../models/dbresult.model';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/isnackbar.service';
declare var $: any;

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.css'
})
export class MachineComponent implements OnInit {

  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 30, 50, 100]
  machines: Machine[] = [];
  machine: Machine = new Machine();
  dbResult: DbResult = new DbResult();
  currentUser: User = new User();
  users: User[] = [];
  user: User = new User();
  private subscription: Subscription = new Subscription();
  @ViewChild('machineGrid') machineGrid!: AgGridAngular;

  constructor(private iuserService: IuserService, private imachineService: IMachineService,private router: Router,private snackBarService:SnackBarService) {
    this.currentUser = iuserService.getCurrentUser();
    if(this.currentUser.u_id==0) { 
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.getMachines();
    this.subscription.add(
      this.imachineService.refreshMachine$.subscribe(() => {
        this.getMachines();
      })
    );


  }
  getMachines() {
    this.imachineService.getMachines().subscribe(
      (data: Machine[]) => {
        this.machines = data;
        this.machineGrid.api.applyTransaction({});

      },
      (error: any) => {
        console.error('Error fetching designation', error);
      }
    );
  }


  colDefs: ColDef[] = [
    { headerName: "Name", field: "m_name" },
    { headerName: "Port", field: "m_port" },
    { headerName: "IP Address", field: "m_ip_address" },
    { headerName: "Type", field: "m_type" },

    { headerName: "Created By", field: "m_cre_by_name" },
    { headerName: "Created On", field: "m_cre_date" },
    {
      headerName: 'Edit', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Edit', action: 'onEdit', cssClass: 'btn btn-info', icon: 'fa fa-edit', onEdit: (data: any) => this.onAction('edit', data)
      },
    },
    {
      headerName: 'Delete', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Delete', action: 'onDelete', cssClass: 'btn btn-danger', icon: 'fa fa-trash', onDelete: (data: any) => this.onAction('delete', data)
      },
    }
  ]
  defaultColDef = {
    sortable: true,
    filter: true
  };

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };

  onAction(action: string, data: any) {
    switch (action) {
      case 'edit':
        this.onEdit(data);
        break;
      case 'delete':
        this.onDelete(data);
        break;
      default:
        ;
    }

  }
  onEdit(data: any) {
    this.imachineService.getMachine(data.m_id).subscribe(
      (data: Machine) => {
        this.machine = data;
        this.imachineService.refreshMachine();
        $('#machineModal').modal('show');
      },
      (error: any) => {
        this.snackBarService.showError(error);
      }
    );
  }


  onDelete(data: any) {
    this.imachineService.deleteMachine(data.m_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.machines = this.machines.filter(c => c.m_id !== data.m_id);
          this.machineGrid.api.applyTransaction({});
          this.imachineService.refreshMachine();
          this.snackBarService.showSuccess("Successfully Created");
        } else {
          this.snackBarService.showError(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting company', error);
      }
    );
  }
  getMachine() {

  }

  onGridReady(event: GridReadyEvent) {

  }


  createMachine() {
    this.machine = new Machine();
    $("#machineModal").modal("show");
  }

  createOrUpdateMachine() {
    this.machine.m_cre_by = this.currentUser.u_id;
    this.imachineService.createOrUpdateMachine(this.machine).subscribe(
      (data: DbResult) => {
        if (data.message === "Success") {
          this.machine=new Machine();
          this.imachineService.refreshMachine();
          $('#MachineModal').modal('hide');
        } else {
          this.snackBarService.showSuccess(data.message);
        }
      },
      (error: any) => {

      }
    );

  }











}

