import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${this.uri}/api/users`);
  }

  getUserById(_id) {
    return this.http.get(`${this.uri}/api/users/${_id}`);
  }

  postUser(jsonData) {
    return this.http.post(`${this.uri}/api/users`, jsonData);
  }

  editUser(editId, jsonData) {
    return this.http.put(`${this.uri}/api/users/${editId}`, jsonData);
  }

  deleteUser(_id) {
    return this.http.delete(`${this.uri}/api/users/${_id}`);
  }

}
