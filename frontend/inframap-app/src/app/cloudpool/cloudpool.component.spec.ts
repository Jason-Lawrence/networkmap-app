import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudpoolComponent } from './cloudpool.component';

describe('CloudpoolComponent', () => {
  let component: CloudpoolComponent;
  let fixture: ComponentFixture<CloudpoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloudpoolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloudpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
