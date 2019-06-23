import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  public listUser: any;
  createUserForm: FormGroup;
  isEditForm = false;
  editId = '';
  invalidForm = false;
  invalidFormMessage = '';

  validationMessages = {
    '_id': {
      'required': 'Task Id is required'
    },
    'firstName': {
      'required': 'First Name is required'
    },
    'lastName': {
      'required': 'Last Name is required'
    },
    'employeeId': {
      'required': 'Parent Name is required'
    }
  };

  formErrors = {
    '_id': '',
    'firstName': '',
    'lastName': '',
    'employeeId': ''
  };
  
  key: string = 'firstName'; //set default
  reverse: boolean = false;
  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
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
    })
  }

  createFormProcess() {
    this.createUserForm = this.fb.group({
      _id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.required]
    });

    if (this.isEditForm) {
      this.userService.getUserById(this.editId).subscribe((response: any) => {
        this.createUserForm.controls['_id'].setValue(response.data._id);
        this.createUserForm.controls['firstName'].setValue(response.data.firstName);
        this.createUserForm.controls['lastName'].setValue(response.data.lastName);
        this.createUserForm.controls['employeeId'].setValue(response.data.employeeId);
      });
    }
  }

  ngAfterViewInit() {
    this.createUserForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.createUserForm);
    })
  }

  logValidationErrors(group: FormGroup = this.createUserForm): void {
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

  onSubmitForm(group: FormGroup = this.createUserForm): void {
    if (!this.createUserForm.valid) {
      this.logValidationErrors(this.createUserForm);
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
      this.userService.postUser(jsonData).subscribe(
        response => { },
        err => {
          this.invalidForm = true;
          this.invalidFormMessage = 'Invalid Form Submission';
        },
        () => {
          this.loadUser();
        }
      );
    } else {
      this.userService.editUser(jsonData['_id'], jsonData).subscribe(
        response => { },
        err => {
          this.invalidForm = true;
          this.invalidFormMessage = 'Invalid Form Submission';
        },
        () => {
          this.router.navigate(['/user'], {});
        }
      );
    }
  }
  deleteUser(_id): void {
    this.userService.deleteUser(_id).subscribe((response: any) => {
      this.loadUser();
    })
  }

  editUser = (_id) => {
    this.router.navigate(['/user/', _id]);
  }
}
