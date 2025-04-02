import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestXyzComponent } from './test-xyz.component';

describe('TestXyzComponent', () => {
  let component: TestXyzComponent;
  let fixture: ComponentFixture<TestXyzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestXyzComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestXyzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
