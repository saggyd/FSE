import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ListTaskComponent } from './list-task.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { of } from 'rxjs';
import { TaskServiceService } from '../../services/task-service.service';

describe('ListTaskComponent', () => {
  let component: ListTaskComponent;
  let fixture: ComponentFixture<ListTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTaskComponent ],
      providers: [
        TaskServiceService
      ],
      imports: [ FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule, RouterTestingModule, Ng2OrderModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit(); (2)
  });

  it('retrieves all task information', inject( [TaskServiceService], ( TaskServiceService ) => {
      TaskServiceService.getTask().subscribe(result => {
        expect(result.data.length).toBeGreaterThan(0)
      });
  }));

  it("should call getUsers and return list of users", async(() => {
    // Arrange
    let response: any;

    //spyOn(TaskServiceService, getTask).and.returnValue(of(response))
    // Act
    component.loadTask();
    fixture.detectChanges();
    //expect(component.listTask).toEqual(response);
    // fixture.detectChanges();
    // fixture.whenStable().subscribe(() => {
    //     expect(component.listTask).toEqual(response);
    // });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
