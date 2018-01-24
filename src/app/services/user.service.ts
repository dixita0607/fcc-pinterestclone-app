import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Image} from "../models/image";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getUser(): Observable<Object> {
    return this.httpClient.get<User>('/api/users/user');
  }

  getUserImages(username: string): Observable<Object> {
    return this.httpClient.get<Image[]>(`/api/users/${username}/images`);
  }

}
