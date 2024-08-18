import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../models/user.model';
import { ScriptLoaderService } from '../../services/script.loader.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  encapsulation: ViewEncapsulation.None 
})
export class LayoutComponent implements OnInit {
  constructor(private scriptLoaderService: ScriptLoaderService) {
   
  }
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
  //  this.scriptLoaderService.loadScripts();
  }
}
