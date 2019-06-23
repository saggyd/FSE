import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserFilterPipe } from './filters/userfilter.pipe';

import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';
import { ModalComponent } from './components/modal/modal.component';
import { RequiredIfDirective } from './directives/required-if.directive';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    ListTaskComponent,
    UserFilterPipe,
    UserComponent,
    ProjectComponent,
    ModalComponent,
    RequiredIfDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2OrderModule,
    ModalModule.forRoot()
  ],
  providers: [TaskServiceService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
