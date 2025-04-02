import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWmsComponent } from './test-wms.component';

describe('TestWmsComponent', () => {
  let component: TestWmsComponent;
  let fixture: ComponentFixture<TestWmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
