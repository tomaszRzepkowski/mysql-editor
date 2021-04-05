import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlTableTreeComponent } from './sql-table-tree.component';

describe('SqlTableTreeComponent', () => {
  let component: SqlTableTreeComponent;
  let fixture: ComponentFixture<SqlTableTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlTableTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlTableTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
