import { Component, OnInit } from '@angular/core';
import { MenuItem, menuItems } from './menu-data';
import { RoleComponent } from './pages/role/component/role.component';
import { MatDialog } from '@angular/material/dialog';
import { DecodedToken } from '../core/main.type';
import { jwtDecode } from 'jwt-decode';
import { AuthServiceService } from '../auth/services/auth-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: DecodedToken | null = null;

  maxDate: Date;

  constructor(public dialog: MatDialog, private authService: AuthServiceService) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.user = jwtDecode(token);
    }
  }


  title: string = 'Cencoe';
  sizeScreen: number = 790;
  collapsed = false;

  menuItems: MenuItem[] = menuItems;

  showMenu() {
    // this.sidenav.toggle();
    this.collapsed = !this.collapsed;
  }


  roles(): void {
    const dialogRef = this.dialog.open(RoleComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('');
    });
  }
  logout() {
    Swal.fire({
      title: '¿Estás seguro de que quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#ff5e6c",
      cancelButtonColor: "rgb(2,0,36)",
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          title: '¡Sesión cerrada!',
          text: 'Has cerrado tu sesión exitosamente.',
          icon: 'success',
          confirmButtonColor: 'rgb(25,25,112)',
         })
      } else {
        Swal.fire({
          title: '¡Sesión activa!',
          text: 'Tu sesión sigue activa.',
          icon: 'info',
          confirmButtonColor: "rgb(2,0,36)"
        });
      }
    })

  }

}