import { Component, ElementRef, ViewChild } from '@angular/core';
import { Attachments } from '../../models/attachments.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.css'
})


export class AttachmentsComponent {

  attachment: Attachments = new Attachments();
  attachments: Attachments[] = [];

  selectedFile: File | null = null;
  pdfUrl: string | null = null;
  savedFileName: string = '';

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type === 'application/pdf') {
        this.selectedFile = file;
        this.pdfUrl = URL.createObjectURL(file);

        const timestamp = this.generateTimestamp();
        this.savedFileName = `pdf_${timestamp}.pdf`;
      } else {
        alert('Please select a PDF file.');
        this.selectedFile = null;
        this.pdfUrl = null;
        this.savedFileName = '';
      }
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.http.post('/upload', formData)



    this.http.post(`${environment.serverHostAddress}/api/Attachments/upload`, formData, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log('Upload success', response);
        alert('response');
      },
      error: (error) => {
        console.error('Upload error', error);
        alert('Error uploading file.');
      },
    });
  }

  generateTimestamp(): string {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `${yyyy}${mm}${dd}_${hh}${min}${ss}`;
  }

  downloadFile() {
    if (!this.selectedFile) {
      alert('No file selected to download.');
      return;
    }

    const a = document.createElement('a');
    a.href = this.pdfUrl!;
    a.download = this.savedFileName || this.selectedFile.name;
    a.click();
  }





}
