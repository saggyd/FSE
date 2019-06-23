import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskServiceService } from '../../services/task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit, AfterViewInit {

  createTaskForm: FormGroup;
  parentLists: any;
  public listUser: any;
  public listProject: any;
  isEditForm = false;
  editId = '';
  invalidForm = false;
  invalidFormMessage = '';

  validationMessages = {
    '_id': {
      'required': 'Task Id is required'
    },
    'projectId': {
      'required': 'Project is required'
    },
    'taskName': {
      'required': 'Task Name is required'
    },
    'priority': {
      'required': 'Priority is required'
    },
    'parentId': {
      'required': 'Parent Name is required'
    },
    'startDate': {
      'required': 'Start date is required'
    },
    'endDate': {
      'required': 'End Date is required'
    },
    'userId': {
      'required': 'User is required'
    }
  };

  formErrors = {
    '_id': '',
    'projectId': '',
    'taskName': '',
    'priority': '',
    'parentId': '',
    'startDate': '',
    'endDate': '',
    'userId': ''
  };

  constructor(private fb: FormBuilder, private userService: UserService, private taskService: TaskServiceService, private projectService: ProjectService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.taskService.getParents().subscribe((response: any) => {
      this.parentLists = response.data;
    });
    this.loadUser();
    this.loadProject();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditForm = true;
        this.editId = params['id'];
      }
    });
    this.createFormProcess();
  }

  loadUser(): void {
    this.userService.getUser().subscribe((response: any) => {
      this.listUser = response.data;
      console.log(response.data);
    })
  }
  loadProject(): void {
    this.projectService.getProject().subscribe((response: any) => {
      this.listProject = response.data;
    })
  }
  createFormProcess() {
    this.createTaskForm = this.fb.group({
      _id: [''],
      projectId: ['', Validators.required],
      taskName: ['', Validators.required],
      priority: ['', Validators.required],
      parentId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      userId: ['', Validators.required]
    });

    if (this.isEditForm) {
      this.taskService.getTaskById(this.editId).subscribe((response: any) => {
        this.createTaskForm.controls['_id'].setValue(response.data._id);
        this.createTaskForm.controls['projectId'].setValue(response.data.projectId);
        this.createTaskForm.controls['taskName'].setValue(response.data.taskName);
        this.createTaskForm.controls['taskName'].disable();
        this.createTaskForm.controls['priority'].setValue(response.data.priority);
        this.createTaskForm.controls['parentId'].setValue(response.data.parentId);
        this.createTaskForm.controls['startDate'].setValue(response.data.startDate);
        this.createTaskForm.controls['endDate'].setValue(response.data.endDate);
        this.createTaskForm.controls['userId'].setValue(response.data.userId);

        const index = this.parentLists.findIndex((obj) => {
          return obj.parentName === response.data.taskName;
        });
        this.parentLists.splice(index, 1);
      });
    }
  }

  ngAfterViewInit() {
    this.createTaskForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.createTaskForm);
    });
  }

  logValidationErrors(group: FormGroup = this.createTaskForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const getKeyInfo = group.get(key);
      if (getKeyInfo && !getKeyInfo.valid && (getKeyInfo.touched || getKeyInfo.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in getKeyInfo.errors) {
          if (errorKey) {
            this.formErrors[key] = messages[errorKey];
          }
        }
      } else {
        this.formErrors[key] = '';
        this.invalidForm = false;
        this.invalidFormMessage = '';
      }
    });
  }

  onSubmitForm(group: FormGroup = this.createTaskForm): void {
    if (!this.createTaskForm.valid) {
      this.logValidationErrors(this.createTaskForm);
      this.invalidForm = true;
      this.invalidFormMessage = 'Invalid Form';
      return;
    }
    const jsonData = {};
    Object.keys(group.controls).forEach((key: string) => {
      jsonData[key] = group.get(key).value ? group.get(key).value : '';
    });
    if (!this.isEditForm) {
      delete jsonData['_id'];
      this.taskService.postTask(jsonData).subscribe(
        response => { },
        err => {
          this.invalidForm = true;
          this.invalidFormMessage = 'Invalid Form Submission';
        },
        () => {
          this.router.navigate(['/list'], {});
        }
      );
    } else {
      this.taskService.editTask(jsonData['_id'], jsonData).subscribe(
        response => { },
        err => {
          this.invalidForm = true;
          this.invalidFormMessage = 'Invalid Form Submission';
        },
        () => {
          this.router.navigate(['/list'], {});
        }
      );
    }
  }

}
