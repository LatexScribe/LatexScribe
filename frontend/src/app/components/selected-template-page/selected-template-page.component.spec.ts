import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTemplatePageComponent } from './selected-template-page.component';

describe('SelectedTemplatePageComponent', () => {
  let component: SelectedTemplatePageComponent;
  let fixture: ComponentFixture<SelectedTemplatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedTemplatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectedTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
