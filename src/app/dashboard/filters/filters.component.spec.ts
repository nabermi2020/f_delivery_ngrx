import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        FiltersComponent
      ],
      providers: [
        ActivatedRoute
      ] 
    }).compileComponents();
  }));

});
