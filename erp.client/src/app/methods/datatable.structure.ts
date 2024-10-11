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

    const firstItem = data[0]; // Use the first item to determine the structure
    const colDefs: ColDef[] = [];

    for (const key in firstItem) {
      if (firstItem.hasOwnProperty(key)) {
        colDefs.push({
          headerName: this.toTitleCase(key.replace(/_/g, ' ')), // Convert field names to headers
          field: key
        });
      }
    }

    return colDefs;
  }

  // Helper method to convert field names to a more readable title case
  private toTitleCase(text: string): string {
    return text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }


}