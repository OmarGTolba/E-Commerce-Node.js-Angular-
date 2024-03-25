import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsDetailsComponent } from './admin-products-details.component';

describe('AdminProductsDetailsComponent', () => {
  let component: AdminProductsDetailsComponent;
  let fixture: ComponentFixture<AdminProductsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProductsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProductsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
