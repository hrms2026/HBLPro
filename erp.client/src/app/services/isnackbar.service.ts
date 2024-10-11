import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {}

  private showSnackBar(message: string, panelClass: string[], duration: number) {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: panelClass
    });
  }

  // Show success message
  showSuccess(message: string) {
    this.showSnackBar(message, ['success-snackbar'],2000);
  }

  // Show error message
  showError(message: string) {
    this.showSnackBar(message, ['danger-snackbar'],3000);
  }
}
