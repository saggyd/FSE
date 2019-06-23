import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-project',
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  modalRef: BsModalRef;
  public listProject: any;
  public listUser: any;
  createProjectForm: FormGroup;
  isEditForm = false;
  editId = '';
  invalidForm = false;
  invalidFormMessage = '';

  validationMessages = {
    '_id': {
      'required': 'Task Id is required'
    },
    'projectName': {
      'required': 'First Name is required'
    },
    'priority': {
      'required': 'Last Name is required'
    },
    'managerId': {
      'required': 'Parent Name is required'
    }
  };

  formErrors = {
    '_id': '',
    'priority': '',
    'lastName': '',
    'managerId': ''
  };
  
  key: string = 'projectName'; //set default
  reverse: boolean = false;
  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private modalService: BsModalService, private fb: FormBuilder, private userService: UserService, private projectService: ProjectService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadProject();
    this.loadUser();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditForm = true;
        this.editId = params['id'];
      }
    });
    this.createFormProcess();
  }
  
  loadProject(): void {
    this.projectService.getProject().subscribe((response: any) => {
      this.listProject = response.data;
    })
  }

  loadUser(): void {
    this.userService.getUser().subscribe((response: any) => {
      this.listUser = response.data;
    })
  }

  openModal() {
    this.modalRef = this.modalService.show(ModalComponent,  {
      initialState: {
        title: 'Select Manager',
        data: this.listUser
      }
    });
    this.modalRef.content.selectedUser.subscribe(this.showUserSelect.bind(this))
  }
  
  showUserSelect(id: boolean) {
    this.createProjectForm.controls['managerId'].setValue(id);
    this.modalRef.hide();
  }

  createFormProcess() {
    this.createProjectForm = this.fb.group({
      _id: [''],
      projectName: ['', Validators.required],
      priority: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      showhideDates: [''],
      managerId: ['', Validators.required]
    });

    if (this.isEditForm) {
      this.projectService.getProjectById(this.editId).subscribe((response: any) => {
        this.createProjectForm.controls['_id'].setValue(response.data._id);
        this.createProjectForm.controls['projectName'].setValue(response.data.projectName);
        this.createProjectForm.controls['priority'].setValue(response.data.priority);
        this.createProjectForm.controls['startDate'].setValue(response.data.startDate);
        this.createProjectForm.controls['endDate'].setValue(response.data.endDate);
        this.createProjectForm.controls['managerId'].setValue(response.data.managerId);
        if(response.data.startDate != '') {
          this.createProjectForm.controls['showhideDates'].setValue(true);
        } else {
          this.createProjectForm.controls['showhideDates'].setValue(false);
        }
      });
    }
  }

  ngAfterViewInit() {
    this.createProjectForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.createProjectForm);
    })
  }

  logValidationErrors(group: FormGroup = this.createProjectForm): void {
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

  onSubmitForm(group: FormGroup = this.createProjectForm): void {
    if (!this.createProjectForm.valid) {
      this.logValidationErrors(this.createProjectForm);
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
      this.projectService.postProject(jsonData).subscribe(
        response => { },
        err => {
          this.invalidForm = true;
          this.invalidFormMessage = 'Invalid Form Submission';
        },
        () => {
          this.createProjectForm.reset();
          this.loadProject();
        }
      );
    } else {
      this.projectService.editProject(jsonData['_id'], jsonData).subscribe(
        response => { },
        err => {
          this.invalidForm = true;
          this.invalidFormMessage = 'Invalid Form Submission';
        },
        () => {
          this.createProjectForm.reset();
          this.router.navigate(['/project'], {});
        }
      );
    }
  }
  deleteProject(_id): void {
    this.projectService.deleteProject(_id).subscribe((response: any) => {
      this.loadProject();
    })
  }

  editProject = (_id) => {
    this.router.navigate(['/project/', _id]);
  }
}
