import { Component, OnInit} from '@angular/core';
import { MenuItem, menuItems } from './menu-data';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

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



}
