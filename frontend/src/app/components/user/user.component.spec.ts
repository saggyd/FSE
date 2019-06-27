import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserFilterPipe } from '../../filters/userfilter.pipe';
import { UserComponent } from './user.component';

import { UserService } from '../../services/user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent, UserFilterPipe ],
      providers: [
        UserService
      ],
      imports: [ FormsModule, ReactiveFormsModule, Ng2OrderModule,HttpModule, HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrieves all User information', inject( [UserService], ( UserService ) => {
    UserService.getUser().subscribe(result => {
        console.log("result",result);
        expect(result.data.length).toBeGreaterThan(0)
      });
  }));

});
