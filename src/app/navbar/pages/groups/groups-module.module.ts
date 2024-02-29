import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsModuleRoutingModule } from './groups-module-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent } from './list-group/groups.component';
import { GroupManagerComponent } from './manage-group/group-manager.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GroupServiceService } from './services/http/group-service.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [GroupsComponent, GroupManagerComponent],
  imports: [
    CommonModule,
    GroupsModuleRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [GroupServiceService]
})
export class GroupsModuleModule { }
