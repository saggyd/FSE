import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../../services/task-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {

  public listTask: any;
  constructor(private taskService: TaskServiceService, private router: Router) { }
  key: string = 'taskName'; //set default
  reverse: boolean = false;
  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.loadTask();
  }

  loadTask(): void {
    this.taskService.getTask().subscribe((response: any) => {
      this.listTask = response.data;
    })
  }

  deleteTask(_id): void {
    this.taskService.deleteTask(_id).subscribe((response: any) => {
      this.loadTask();
    })
  }

  editTask = (_id) => {
    this.router.navigate(['/create/', _id]);
  }


}
