import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { IuserService } from '../../../services/iuser.service';
import { Menu } from '../../../models/menu.model';
import { IMenuService } from '../../../services/imenu.service';
import { ScriptLoaderService } from '../../../services/script.loader.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit { 
  currentUser: User = new User();
  menus:Menu []=[];
  constructor(private iuserService: IuserService,private imenuService: IMenuService,private router: Router ,private scriptLoaderService: ScriptLoaderService) {
    this.currentUser = iuserService.getCurrentUser();
    if(this.currentUser.u_id==0 ||!this.currentUser) { 
      this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
    
    this.getMenusByRole();
  }
  ngAfterViewInit(): void {
    this.scriptLoaderService.loadScripts();
  }
  getMenusByRole(){
    this.imenuService.getMenusByRole(this.currentUser.u_id).subscribe(
      (data: Menu[]) => {
        this.menus = data;
        this.scriptLoaderService.loadScripts();
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }
  navigateTo(moveto: string) {
    this.router.navigate(['/'+moveto]);
  }
}
