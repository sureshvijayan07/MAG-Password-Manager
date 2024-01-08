import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteListComponent } from './site-list.component';

describe('SiteListComponent', () => {
  let component: SiteListComponent;
  let fixture: ComponentFixture<SiteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteListComponent]
    });
    fixture = TestBed.createComponent(SiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
