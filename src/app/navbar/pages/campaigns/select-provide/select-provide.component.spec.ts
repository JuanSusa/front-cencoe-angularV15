import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProvideComponent } from './select-provide.component';

describe('SelectProvideComponent', () => {
  let component: SelectProvideComponent;
  let fixture: ComponentFixture<SelectProvideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProvideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProvideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
