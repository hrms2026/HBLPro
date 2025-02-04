import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Injectable({
  providedIn: 'root'
})
export class DataTableStructure {

  constructor() { }

  getDatatableStructure(data: any[]): ColDef[] {
    if (!data || data.length === 0) {
      return [];
    }

    const firstItem = data[0]; 
    const colDefs: ColDef[] = [];

    for (const key in firstItem) {
      if (firstItem.hasOwnProperty(key)) {
        colDefs.push({
          headerName: this.toTitleCase(key.replace(/_/g, ' ')),
          field: key
        });
      }
    }

    return colDefs;
  }

   private toTitleCase(text: string): string {
    return text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }


}