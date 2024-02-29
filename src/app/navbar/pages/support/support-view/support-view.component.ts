import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support-view.component.html',
  styleUrls: ['./support-view.component.scss']
})
export class SupportComponent {
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const file: File = files[0]; 
      console.log('archivo seleccionado', file)
    }
  }
}
