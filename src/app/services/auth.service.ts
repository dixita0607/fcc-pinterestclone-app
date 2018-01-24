import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs/Observable";
import {CanActivate} from "@angular/router";

@Injectable()
export class AuthService {

  user: User;

  initialized: boolean = false;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('/api/users/user').subscribe(
      (user: User) => {
        this.user = user;
        this.initialized = true;
      }
      ,
      error => {
        console.log(error);
        this.initialized = true;
      }
    )
  }

}
