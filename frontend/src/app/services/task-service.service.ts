import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  uri = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getTask() {
    return this.http.get(`${this.uri}/api/tasks`);
  }

  getTaskById(_id) {
    return this.http.get(`${this.uri}/api/tasks/${_id}`);
  }

  getParents() {
    return this.http.get(`${this.uri}/api/parents`);
  }

  postTask(jsonData) {
    return this.http.post(`${this.uri}/api/tasks`, jsonData);
  }

  editTask(editId, jsonData) {
    return this.http.put(`${this.uri}/api/tasks/${editId}`, jsonData);
  }

  deleteTask(_id) {
    return this.http.delete(`${this.uri}/api/tasks/${_id}`);
  }

}
