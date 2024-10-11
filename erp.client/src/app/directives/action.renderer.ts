import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-renderer',
  template: `
    <button class="{{cssClass}}" (click)="onButtonClick()">
      <i [class]="icon"></i> {{ name }}
    </button>
  `,
  styles: [`
    button {
      margin-right: 5px;
    }
  `]
})
export class ActionRendererComponent {
  private params!: ICellRendererParams;
  name: string = '';
  icon: string = '';
  action: string = '';
  cssClass: string='';
  data :string='';
  

  agInit(params: any): void {
    this.params = params;
    this.name = params.name || '';
    this.icon = params.icon || '';
    this.cssClass=params.cssClass || '';
    this.action = params.action || '';
    this.data= params.data||'';
  }

  onButtonClick(): void {
    const actionParams = this.params as any;
    if (actionParams && actionParams[this.action]) {
      actionParams[this.action](this.params.data);
    } else {
      console.error(`Action function '${this.action}' not found in params`);
    }
  }
}
