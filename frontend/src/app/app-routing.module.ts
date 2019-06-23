import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';

const routes: Routes = [
  {path: 'list', component: ListTaskComponent},
  {path: 'create', component: CreateTaskComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'create/:id', component: CreateTaskComponent},
  {path: 'project', component: ProjectComponent},  
  {path: 'project/:id', component: ProjectComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
