import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
    
  title;
  data;
  public list: any;
  @Output() selectedUser: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public modalRef: BsModalRef,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  selectUser(event, id) {
    this.selectedUser.emit(id);
  }

}