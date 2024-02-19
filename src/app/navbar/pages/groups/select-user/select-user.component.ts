import { Component } from '@angular/core';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent {
  constructor() { }

  // Define el método 'search()' que será llamado cuando se haga clic en el botón
  search() {
    // Lógica de búsqueda aquí
    console.log('Se hizo clic en el botón de búsqueda');
  }
}


