import { TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { TaskServiceService } from './task-service.service';

describe('TaskServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpModule, HttpClientModule ]
  }));

  it('should be created', () => {
    const service: TaskServiceService = TestBed.get(TaskServiceService);
    expect(service).toBeTruthy();
  });
});
