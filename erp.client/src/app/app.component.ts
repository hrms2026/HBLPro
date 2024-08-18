import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptLoaderService } from './services/script.loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.Emulated // or ViewEncapsulation.Emulated, ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient,private scriptLoaderService: ScriptLoaderService) { }

  title = 'erp.client';

  ngOnInit() {
    // Initialize or perform any setup
    this.scriptLoaderService.loadScripts();
  }
}
