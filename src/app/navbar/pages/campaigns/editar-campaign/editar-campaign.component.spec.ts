import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCampaignComponent } from './editar-campaign.component';

describe('EditarCampaignComponent', () => {
  let component: EditarCampaignComponent;
  let fixture: ComponentFixture<EditarCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCampaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
