import { Injectable } from '@angular/core';
import { GridApi } from 'ag-grid-community'; // Only import GridApi

@Injectable({
  providedIn: 'root',
})
export class GridService {
  resizeGridColumns(gridApi: GridApi): void {
    const screenWidth = window.innerWidth;

    // Get the total width of all visible columns
    const allDisplayedColumns = gridApi.getAllDisplayedColumns();
    let totalColumnWidth = 0;

    if (allDisplayedColumns) {
      allDisplayedColumns.forEach((col) => {
        totalColumnWidth += gridApi.getColumnState().find((c) => c.colId === col.getColId())?.width || 0;
      });
    }

    // Get the width of the grid container
    const gridContainer = document.querySelector('.ag-root'); // Modify the selector if needed
    const gridContainerWidth = gridContainer ? gridContainer.clientWidth : 0;

    // Resize columns only if content overflows or screen is smaller
    if (screenWidth < 2000 || totalColumnWidth > gridContainerWidth) {
      gridApi.sizeColumnsToFit(); // Fit columns to the grid width
    } else {
      gridApi.sizeColumnsToFit(); // Auto size columns based on content
    }
  }
}
