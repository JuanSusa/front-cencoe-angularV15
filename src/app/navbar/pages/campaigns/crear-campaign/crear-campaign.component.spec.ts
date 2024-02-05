import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCampaignComponent } from './crear-campaign.component';

describe('CrearCampaignComponent', () => {
  let component: CrearCampaignComponent;
  let fixture: ComponentFixture<CrearCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCampaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
