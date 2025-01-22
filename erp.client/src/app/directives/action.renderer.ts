import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-renderer',
  template: `
    <button *ngIf="!isButtonDisabled()" class="{{cssClass}}" (click)="onButtonClick()">
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
  cssClass: string = '';
  isDisabled: boolean = false;

  agInit(params: any): void {
    this.params = params;
    this.name = params.name || '';
    this.icon = params.icon || '';
    this.cssClass = params.cssClass || '';
    this.action = params.action || '';

    if (typeof params.disable === 'function') {
      this.isDisabled = params.disable(params.data);
    }
  }

  isButtonDisabled(): boolean {
    return this.isDisabled;
  }

  onButtonClick(): void {
    if (!this.isDisabled) {
      const actionParams = this.params as any;
      if (actionParams && actionParams[this.action]) {
        actionParams[this.action](this.params.data);
      } else {
        console.error(`Action function '${this.action}' not found in params`);
      }
    }
  }
}
