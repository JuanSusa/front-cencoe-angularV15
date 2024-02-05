import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignComponent } from './campaigns.component';


describe('CampaignsComponent', () => {
  let component: CampaignComponent;
  let fixture: ComponentFixture<CampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignComponent]
    });
    fixture = TestBed.createComponent(CampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
