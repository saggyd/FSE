import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
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
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';


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

  it('retrieves all Project information', inject( [ProjectService], ( ProjectService ) => {
    ProjectService.getProject().subscribe(result => {
        expect(result.data.length).toBeGreaterThan(0)
      });
  }));

  it('retrieves all user information in Project', inject( [UserService], ( UserService ) => {
    UserService.getUser().subscribe(result => {
        expect(result.data.length).toBeGreaterThan(0)
      });
  }));

  it('create project form invalid when empty', () => {
    expect(component.createProjectForm.valid).toBeFalsy();
  });
});
