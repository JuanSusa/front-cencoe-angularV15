import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItem, menuItems } from './menu-data';
import { BehaviorSubject, Observable, distinctUntilChanged, map, startWith } from 'rxjs';

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

  menuItems: MenuItem[] = menuItems;


  
  // @ViewChild('sidenav') sidenav!: MatSidenav;
  collapsed = false;
  showMenu() {
    // this.sidenav.toggle();
    this.collapsed = !this.collapsed;
  }


  
}
