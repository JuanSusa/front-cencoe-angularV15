import { Component, OnInit } from '@angular/core';
import { RoleServiceHttpService } from '../services/role-service-http.service';
import { Role } from '../core/models/main.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit{

  public roles : Role[] = [];

  constructor(
    private readonly _roleServiceHttp : RoleServiceHttpService
  ){ }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this._roleServiceHttp.getAllroles().subscribe(
      data => {
        this.roles = data
      }
    )
  }
}
