import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { RequiredIfDirective } from '../../directives/required-if.directive';
import { ProjectComponent } from './project.component';
import { UserFilterPipe } from '../../filters/userfilter.pipe';


describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BsModalService
      ],
      declarations: [ ProjectComponent, RequiredIfDirective, UserFilterPipe ],
      imports: [ FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule, RouterTestingModule, Ng2OrderModule, ModalModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
