import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed } from '@angular/core/testing';
import { LoadingService } from "../services/loading.service";
import { ChangeDetectorRef } from "@angular/core";
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        LoadingComponent
      ],
      providers: [
        LoadingService,
        ChangeDetectorRef
      ] 
    }).compileComponents();
  }));
});
