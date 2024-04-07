import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesCategoriesPageComponent } from './templates-categories-page.component';

describe('TemplatesCategoriesPageComponent', () => {
  let component: TemplatesCategoriesPageComponent;
  let fixture: ComponentFixture<TemplatesCategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplatesCategoriesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatesCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
