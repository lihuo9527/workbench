import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnalysisListComponent } from './detail-analysis-list.component';

describe('DetailAnalysisListComponent', () => {
  let component: DetailAnalysisListComponent;
  let fixture: ComponentFixture<DetailAnalysisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAnalysisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
