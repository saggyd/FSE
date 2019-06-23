import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  uri = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getProject() {
    return this.http.get(`${this.uri}/api/projects`);
  }

  getProjectById(_id) {
    return this.http.get(`${this.uri}/api/projects/${_id}`);
  }

  postProject(jsonData) {
    return this.http.post(`${this.uri}/api/projects`, jsonData);
  }

  editProject(editId, jsonData) {
    return this.http.put(`${this.uri}/api/projects/${editId}`, jsonData);
  }

  deleteProject(_id) {
    return this.http.delete(`${this.uri}/api/projects/${_id}`);
  }

}
