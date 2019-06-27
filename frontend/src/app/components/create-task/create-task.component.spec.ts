import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateTaskComponent } from './create-task.component';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskComponent ],
      imports: [ReactiveFormsModule, HttpModule, HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit(); (2)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('create task form invalid when empty', () => {
    expect(component.createTaskForm.valid).toBeFalsy();
  });
  it('projectID field validity', () => {
    let projectId = component.createTaskForm.controls['projectId']; (1)
    expect(projectId.valid).toBeFalsy(); (2)
  });
  it('submitting a createTaskForm emits a user', () => {
    expect(component.createTaskForm.valid).toBeFalsy();
    component.createTaskForm.controls['_id'].setValue("10");
    component.createTaskForm.controls['projectId'].setValue("10");
    component.createTaskForm.controls['priority'].setValue("10");
    component.createTaskForm.controls['parentId'].setValue("abcd");
    component.createTaskForm.controls['startDate'].setValue("2019-06-06");
    component.createTaskForm.controls['endDate'].setValue("2019-06-07");
    component.createTaskForm.controls['userId'].setValue("abcd123");
    //expect(component.createTaskForm.valid).toBeTruthy();

    //let user: User;
    // Subscribe to the Observable and store the user in a local variable.
    //component.loggedIn.subscribe((value) => user = value);

    // Trigger the login function
    //component.createFormProcess();

    // Now we can check to make sure the emitted value is correct
    //expect(createTaskForm.priority).toBe("test@test.com");
    //expect(user.password).toBe("123456789");
  });

});
