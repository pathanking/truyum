import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  authenticate(username: string, password: string): Observable<User> {
    return Observable.create((observer: Observer<any>) => { // temporary
      if (username !== 'admin') {
        observer.next({ username, firstName: 'John', lastName: 'Doe', role: 'Customer', 
        accessToken: 'JWT-TOKEN' });
      } else {
        observer.next({ username, firstName: 'Admin', lastName: 'User', role: 'Admin', 
        accessToken: 'JWT-TOKEN' });
      }
      return null;
    });
  }
}
