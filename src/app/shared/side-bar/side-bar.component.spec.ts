import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed } from '@angular/core/testing';
import { SideBarComponent } from './side-bar.component';

describe('SideBarComponent', () => {  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SideBarComponent
      ]
    }).compileComponents();
  }));
});
