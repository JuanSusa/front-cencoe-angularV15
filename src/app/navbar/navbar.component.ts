import { Component, OnInit} from '@angular/core';
import { MenuItem, menuItems } from './menu-data';
import { RoleComponent } from './pages/role/role.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  maxDate: Date;
  constructor(
    public dialog: MatDialog,
  ) { this.maxDate = new Date();}

  ngOnInit(): void {
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

}
